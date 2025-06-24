const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
router.post('/add/placelist', (req, res)=> {
    DeliveryController.addPlaceList(req, res)
})
module.exports =  router;