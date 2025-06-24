const express = require('express');
const bodyParser = require('body-parser');
const pincodeController = require('../controllers/PincodeController');
const auth = require('../middleware/auth');

const multer = require("multer");
const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));
const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get('/pincodes', (req,res)=>{
    pincodeController.getPincodes(req,res);
})
router.post('/add/pincode', (req,res)=>{
    pincodeController.addPincode(req,res);
})

router.get('/get/pincode/:id',(req,res)=>{
    console.log("one pin")
    pincodeController.getPincodes(req,res)
})
router.post('/check/status',(req,res)=>{
    pincodeController.checkStatus(req,res);
})


module.exports = router;