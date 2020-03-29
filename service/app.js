const express = require('express');
const app = express();
const mongodb = require('../config/database');
const clientRoute = require('./routes/client');
const adminRoute = require('./routes/admin');
app.use('/client',clientRoute);
app.use('/admin',adminRoute);
app.listen(process.env.MICRO_SERVICE_PORT,()=>{
    console.log("Micro runned");
});


module.exports = app;