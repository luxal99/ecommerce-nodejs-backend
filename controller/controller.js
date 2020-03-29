const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const service = require('../service/app');
const axios = require('axios');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
app.use(cors())

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
            total:req.body.total,
            productList:req.body.productList

        }).then(
            res.json({message: "Success"})
        )
    } catch {
        res.json({message: "Axios error"});
    }

});
//endregion
module.exports = app;
