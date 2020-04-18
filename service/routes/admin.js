require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const fileUpload = require('express-fileupload');
const Order = require('../model/Order');
const Product = require('../model/Product');

app.use(bodyParser.urlencoded({extended: true}));
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


router.get('/getOrders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch {
        res.json({message: "Database error"});
    }
});

router.get('/getOrdersById/:idCompany', async (req, res) => {
    try {

        class OrderModel{
            _id;
            product;
            client;
            price;
            date;
            total;

            constructor() {
                this.price = 0;
                this.product = [];
            }
        }

        const id = parseInt(req.params.idCompany);
        const allOrders = await Order.find();
        const orderArr=[];

       var isIdMatching = false;


        for (const element of allOrders) {

               var model = new OrderModel();
               model._id = element._id;
               model.client = element.client;
               model.total = element.total;
               model.date = element.date;
               for (const product of element.productList) {
                   if (product.idCompany.idCompany === id) {
                       isIdMatching = true;
                       model.price+=(product.price)*(product.orderAmount);
                       model.product.push(product);
                       orderArr.push(model)
                   }
               }


           }

        const unique = [...new Map(orderArr.map(item => [item._id, item])).values()];
        res.send(unique);
    } catch {
        res.send("Error")
    }
})

router.delete('/deleteOrder/:id_order', async (req, res) => {
    try {
        const removedOrder = await Order.deleteOne({_id: req.params.id_order});
        res.send(200);
    } catch {
        res.send({message: "Database error"})
    }
});

router.get("/getAnalytics" ,async (req,res)=>{
    const product = await Product.aggregate([
        {
            "$group": {
                "_id": {
                    "__alias_0": "$title"
                },
                "__alias_1": {
                    "$sum": "$orderAmount"
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "__alias_0": "$_id.__alias_0",
                "__alias_1": 1
            }
        },
        {
            "$project": {
                "x": "$__alias_0",
                "y": "$__alias_1",
                "_id": 0
            }
        },
        {
            "$limit": 5000
        }
    ]);

    res.send(product)
})


module.exports = router;
module.exports = app;
