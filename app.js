const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json({limit: '70mb'}));
app.use(bodyParser.urlencoded({limit: '70mb', extended: false, parameterLimit: 1000000}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


const router = require('./app/routers/index.js');
app.use('/', router);

app.get('/', (req, res) => {
    res.json({"message": "This is for testing"});
});

app.listen(4006, () => {
    console.log("Server is listening on port 4006");
});
