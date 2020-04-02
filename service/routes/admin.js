require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const fileUpload = require('express-fileupload');
const Order = require('../model/Order');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(fileUpload());


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

router.delete('/deleteOrder/:id_order',async (req,res)=>{
    try{
        console.log(req.params.id_order);
        const removedOrder = await Order.deleteOne({_id:req.params.id_order});
        res.send(200);
    }catch  {
        res.send({message:"Database error"})
    }
});



module.exports = router;
module.exports = app;
