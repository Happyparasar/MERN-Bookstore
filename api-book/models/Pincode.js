const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
let Schema = mongoose.Schema;
const PincodeSchema = new Schema({
    pincode : {type : String, require:true},
    delivery : {type : String, require:true},
    
    createdAt: Date,
    updatedAt: Date,
})
PincodeSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Pincode', PincodeSchema )