const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const controller = require('./controller/controller');
app.use('/api',controller);
require('dotenv').config();

app.listen(process.env.API_PORT,()=>{
    console.log("App runned");
});

app.use(bodyparser.json());

