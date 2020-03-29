const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const Order = require('../model/Order');

app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));
app.use(bodyparser.json());
app.use(cors());

require('dotenv').config();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

router.post('/saveOrder',(req,res)=>{
    const order = new Order({
        date:Date.now(),
        total:400,
        productList: [
            {title:'Smoki',amount:200},
            {title:'Smoki',amount:200}
        ]
    })

    order.save().then(data=>{
        res.json(order)
    }).catch(err=>{
        res.send(err);
    })
})


module.exports = router;