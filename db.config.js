let mongoose = require("mongoose");

const dbUri = process.env.DB_URI;
mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 20
}).then(() => {
    console.log('DB connection established ');
}).catch(error => {
    console.error('Could not establish mongoose connection');
})
