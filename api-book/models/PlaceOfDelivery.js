const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;
const PlaceOfDeliverySchema = new Schema({
    pinCode: { type: String, required: true },
    deliveryTime: { type: String },
    status: { type: String, default: 'Active', enum: ['Active', 'InActive']},
    createdAt: Date,
    updatedAt: Date,
})
PlaceOfDeliverySchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('PlaceOfDelivery', PlaceOfDeliverySchema);