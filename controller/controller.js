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
    res.send('Node js');
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

router.post('/registration/client', async (req, res) => {
    console.log(req.body)
    try {
        const user = await axios.post("http://localhost:8080/registration/user", {
            username: req.body.username,
            password: req.body.password,
            idClient: req.body.idClient,
            idUserType: req.body.idUserType
        });

        res.send(user.data);

    } catch {
        res.send({message: "Axios error"})
    }


});

router.post('/registration/company', async (req, res) => {
    try {
        const user = await axios.post("http://localhost:8080/registration/company", {
            username: req.body.username,
            password: req.body.password,
            idCompany: req.body.idCompany,
            idUserType: req.body.idUserType
        });

        res.send(user.data);

    } catch {
        res.send({message: "Axios error"})
    }


});

router.get('/registration/getUserType', async (req, res) => {
    try {
        const userType = await axios.get("http://localhost:8080/registration/getUserType");
        res.json(userType.data)
    } catch {

    }
})

//endregion
module.exports = app;
