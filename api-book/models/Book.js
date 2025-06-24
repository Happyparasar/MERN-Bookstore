const mongoose = require('mongoose');
const timestamps = require("mongoose-timestamps");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    bookName: { type: String },
    authorName: { type: String },
    bookDescription: { type: String },
    language: { type: String , default: 'English', enum: ['English', 'Hindi'] },
    pages: { type: Number },
    status: { type: String , default: 'New', enum: ['New', 'PreOwned']},
    category: { type: String , default: 'Academic', enum:['Academic', 'Comic', 'Horror', 'Sports', 'Cultural', 'Beauty', 'Medical'] },
    price: { type: Number },
    isDiscountApplicable: { type: Boolean , default: false,  enum: [true, false]},
    discountType: { type: String, default: 'Percentage', enum: ['Percentage', 'Fixed']},
    discountedUnit: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    seller: { type: String },
    binding: { type: String },
    publisher: { type: String },
    edition: { type: String },
    returnPolicy: { type: String },
    quantityAvailable: { type: Number },
    bookImage: { type: String , default: '' },
    ratings: { type: Number },
    createdAt: Date,
    updatedAt: Date,
})
BookSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Book', BookSchema);
