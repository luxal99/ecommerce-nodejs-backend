const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
    },
    orderAmount:{
        type:Number
    }
});

module.exports = mongoose.model('product', ProductSchema);