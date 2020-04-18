const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    idClient:{
      type:Number
    },
    name:{
        type:String,
        required:true
    },
    lastname: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    telephone:{
        type:String
    }
});

module.exports = mongoose.model('client', ClientSchema);