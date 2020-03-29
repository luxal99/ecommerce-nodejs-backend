const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const Order = require('../model/Order');

app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

require('dotenv').config();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


router.get('/getOrders',async (req,res)=>{
    try{
        const orders = await Order.find();
        res.json(orders);
    }catch  {
        res.json({message:"Database error"});
    }
});

router.delete('/deleteOrder',async (req,res)=>{
    try{

        const removedOrder = await Order.deleteOne({_id:req.body.id_order});
        res.send(200);
    }catch  {
        res.send({message:"Database error"})
    }
})



module.exports = router;
module.exports = app;
