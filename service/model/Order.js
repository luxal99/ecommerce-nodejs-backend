const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({

    client:{
        type:Schema.Types.Object,ref:'Client'
    },
    date:{
        type: Date,
        default:Date.now()
    },
    total:{
        type:Number,
        required:true
    },
    productList:[{
        type:Schema.Types.Object,ref:"Product"
    }]

});

module.exports =  class Order{
    product;
    client;
    date;
    total;
}

module.exports = mongoose.model('order',OrderSchema);