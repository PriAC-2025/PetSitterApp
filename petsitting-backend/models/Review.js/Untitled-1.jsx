

//models/Review.js

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    petsitter: { type: mongoose.Schema.Types.ObjectId, ref: 'Petsitter', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', ReviewSchema);
