const Pincode = require('../models/Pincode')
const cloudinary = require("cloudinary").v2;


async function addPincode(req, res) {
    try {
        let pincode = new Pincode(req.body);
        await pincode.save();
        res.status(200).send({ success: true });
    } catch (err) {
        console.log(err.message)
        res.status(400).send({ success: false });

    }
}
async function getPincodes(req, res) {
    try {
        let pincodes = await Pincode.find({});
        res.status(200).send({ success: true, data: pincodes })
    } catch (err) {
        console.log(err.message)
        res.status(400).send({ success: false })

    }
}
async function getPincode(req, res) {
    try {
        let id = req.params.id;
        let pincode = await Pincode.findOne({_id : id});
        res.status(200).send({ success: true, data: pincode })
    } catch (err) {
        console.log(err.message)
        res.status(400).send({ success: false })

    }
}

async function checkStatus(req, res) {
    try {
        let pin = req.body.pincode
        let pincode = await Pincode.findOne({pincode:pin})
        
        res.status(200).send({ success: true ,data: pincode.delivery});
    } catch (err) {
        console.log(err.message)
        res.status(400).send({ success: false });

    }
}

module.exports = {
    getPincodes,
    checkStatus,
    getPincode,
    addPincode,
}