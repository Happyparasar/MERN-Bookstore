const express = require('express');
const paymentcontroller = require('../controllers/PaymentController');
const router = express.Router();
router.post('/create-checkout-session', (req, res)=> {
    console.log("payment route")
    paymentcontroller.doPayment(req, res);

})
module.exports = router;