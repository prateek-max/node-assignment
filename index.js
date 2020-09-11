require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

require('./db.config');

app.use(express.static('dist'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require('express-history-api-fallback')('index.html', {root:'dist'}))

app.use('/uploads', express.static('uploads'))
app.use('/api', require('./routes'))

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT)
})