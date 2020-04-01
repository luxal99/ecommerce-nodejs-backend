require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const Order = require('../model/Order');
const Product = require('../model/Product');
app.use(express.static(__dirname + '/static', {dotfiles: 'allow'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

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
            date: req.body.date,
            total: req.body.total,
            productList: req.body.productList
        });

        order.save().then(() => {
            const productList = req.body.productList;

            for (const productFromArr of productList) {
                console.log(productFromArr);
                const product = new Product({

                    title: productFromArr.title,
                    amount: productFromArr.amount,
                    code: productFromArr.code
                });

                product.save().then(() => {

                })
            }
        });


        res.json({message: "Saved"});
    } catch {
        res.json({message: "Database error"})
    }

});


module.exports = router;
module.exports = app;