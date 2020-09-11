const mongoose = require('mongoose')


const UploadModel = new mongoose.Schema({
    path:{type:String},
    fileName:{type:String}
})
module.exports = mongoose.model('UploadedFiles',UploadModel)