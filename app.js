const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongodb = require('./config/database');
app.use(bodyparser.json());
app.listen(process.API_PORT,()=>{
    console.log("App runned");
});

