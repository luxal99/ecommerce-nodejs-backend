const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('../service/app');
const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);
app.use(cors());

router.get('/', (req, res) => {
    res.send('');
});


//region -- Node Servis --

/*
    Funkciji se prosledjuje body preko POST metode,
    zatim se preko biblioteke @axios poziva servis za
    upis u bazu koji prirada mikroservisu.
 */
router.post('/saveOrder', async (req, res) => {

    try {
        await axios.post('http://localhost:8000/client/saveOrder', {
            date: Date.now(),
            total: req.body.total,
            productList: req.body.productList

        }).then(
            res.json({message: "Success"})
        )
    } catch {
        res.json({message: "Axios error"});
    }

});

//Funcija vraca sve porudzbine u JSON formatu
router.get('/getOrders', async (req, res) => {
    try {
        const orders = await axios.get("http://localhost:8000/admin/getOrders");
        res.json(orders.data)
    } catch {
        res.send({message: "Axios error"});
    }
});

/*
    Funkcija koja brise odredjenu porudzbinu.
    Id porudzbine se prosledjuje kroz body
 */
router.delete('/deleteOrder/:id_order', async (req, res) => {

    try {
        await axios.delete(`http://localhost:8000/admin/deleteOrder/${req.params.id_order}`);
        res.json({message: "Deleted"})
    } catch {
        res.send({message: "Axios error"});
    }

});
//endregion

//region -- Java Serivice --

router.post('/register/user', async (req, res) => {

    try {

        const userAddress = await axios.post("http://localhost:8080/registration/saveUserAddress", {
            city: req.body[0].city,
            address: req.body[0].address
        });

        const client = await axios.post('http://localhost:8080/registration/saveClient', {
            name: req.body[1].name,
            lastname: req.body[1].lastname,
            telephone: req.body[1].telephone,
            mail: req.body[1].mail,
            idUserAddress: userAddress.data
        });

        const user = await axios.post('http://localhost:8080/registration/saveUser', {
            username: req.body[2].username,
            password: req.body[2].password,
            idUserType: req.body[2].idUserType,
            idClient: client.data

        });

        res.send({savedUser: user.data});

    } catch {
        res.send({message: "Axios error"})
    }


});

//endregion
module.exports = app;
