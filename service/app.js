const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongodb = require('../config/database');
const clientRoute = require('./routes/client');
app.use('/client',clientRoute);
app.use(bodyparser.json());
app.listen(process.env.MICRO_SERVICE_PORT,()=>{
    console.log("Micro runned");
});

module.exports = app;