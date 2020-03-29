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


// Funkija za upis porudzbine u bazu
router.post('/saveOrder', (req, res) => {
    try {
        const order = new Order({
            date : req.body.date,
            total:req.body.total,
            productList:req.body.productList
        });

        order.save().then(() => {
            res.json(order);
        })
    } catch {
        res.json({message: "Database error"})
    }

});



module.exports = router;
module.exports = app;