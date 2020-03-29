const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = express.Router();
const service = require('../service/app')
router.get('/',(req,res)=>{
    res.send('');
});

module.exports = router;
