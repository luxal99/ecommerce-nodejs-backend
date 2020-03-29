const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({

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

})

module.exports = mongoose.model('order',OrderSchema)