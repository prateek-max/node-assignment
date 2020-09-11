const Router = require('express').Router();
const fs = require('fs')
const UploadModel = require('./uploadFiles.model')
const multer = require('multer')
const upload = multer({ dest: 'uploads' }).array('files');


Router.post('/uploadFile', upload, async function (request, response) {
    try {
        let files = request.files;

        if (files.length < 4) {
            files.forEach(f => fs.unlink(f.path, () => { }))
            return response.status(400).send({ message: 'Please select atleast 4 files.' })
        }
        let allowedExts = ['jpeg', 'pdf', 'jpg', 'gif', 'png']
        if (!files.every(file => allowedExts.includes(file.mimetype.split('/').pop()))) {
            files.forEach(f => fs.unlink(f.path, () => { }))
            return response.status(400).send({ message: 'Unsupported file types : Supported files type are : ' + allowedExts.toString() })
        }

        let totalSize = files.reduce((prev, cur) => prev + cur.size, 0);
        let sizeInMb = totalSize / (1024 * 1024).toFixed(2)
        if (sizeInMb > 2) {
            files.forEach(f => fs.unlink(f.path, () => { }))
            return response.status(400).send({ message: 'The combined size of all the files must not exceed 2 MB.' })
        }
        let fileInfos = files.map(file => { return { fileName: file.originalname, path: file.path } })

        await UploadModel.insertMany(fileInfos)

        response.status(200).send({ message: 'Files uploaded successfully' })
    } catch (error) {
        response.status(500).send({ message: 'Internal Server Error' })
    }
})


Router.get('/fetchUploadedFiles', async function (request, response) {
    try {
        if(!fs.existsSync('uploads')) fs.mkdirSync('uploads')
        let uploadedFiles = await UploadModel.find();
        response.send({ uploadedFiles: uploadedFiles })
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: 'Internal Server Error' })
    }
})



module.exports = Router;