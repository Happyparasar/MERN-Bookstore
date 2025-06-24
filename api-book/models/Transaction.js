const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
let Schema = mongoose.Schema;
const TransactionSchema = new Schema({
    firstName : { type: String, required: true },
    lastName: { type: String, default: '' },
    mobileNo: { type: String, default: '' },
    email:  { type: String, required: true },
    shippingAddressLine1: { type: String, default : '' },
    shippingAddressLine2: { type: String, default : '' },
    shippingAddressCity: { type: String, default : '' },
    shippingAddressState: { type: String, default : '' },
    shippingAddressCountry: { type: String, default : 'India' },
    shippingAddressZipCode: { type: String, default : '' },
    products: { type: JSON, default: [] },
    status: { type : String, default: 'Pending', enum: ['Pending', 'Success', 'Failed']},
    transactionId: { type: String, default: '' },
    transactionDate: Date,
    createdAt: Date,
    updatedAt: Date,
})
TransactionSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Transaction', TransactionSchema )