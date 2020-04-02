const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('../service/app');
const axios = require('axios');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.json());
app.use(router);
app.use(cors());
app.use(fileUpload());

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


/**
 * Servis koji Spring servisu prosledjuje
 * objekat user sa frontenda
 */
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

/**
 * Servis koji Spring servisu prosledjuje
 * objekat user sa frontenda
 */
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
});

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const user = await axios.post("http://localhost:8080/login/checkUser", {
            username: req.body.username,
            password: req.body.password
        });
        res.send(user.data);
    } catch {
        res.send("Axios error");
    }
});


//Upload image
app.post('/admin/upload', function (req, res) {
    console.log(req.files.picture)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.picture;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`../../Frontend/ecommerce-frontend/src/assets/img/${sampleFile.name}`, function (err) {
        if (err)
            return res.status(500).send(err);

        res.send(sampleFile.name);
    });
});

router.post('/admin/saveProduct', async (req, res) => {

    console.log(req.body)
   try{
       const product = await axios.post("http://localhost:8080/admin/saveProduct", {
           code: req.body.code,
           title: req.body.title,
           text: req.body.text,
           price: req.body.price,
           amount: req.body.amount,
           idCompany: req.body.idCompany

       });

       res.send("Product saved");
   }catch  {
       res.send("Axios error");
   }
})

//endregion
module.exports = router;
module.exports = app;
