const express = require('express');
const app = express();
const mongodb = require('../config/database');
const clientRoute = require('./routes/client');
app.use('/client',clientRoute);
app.listen(process.env.MICRO_SERVICE_PORT,()=>{
    console.log("Micro runned");
});


module.exports = app;