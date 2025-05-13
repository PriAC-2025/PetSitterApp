

//models/Petsitter.js

const mongoose = require('mongoose');

const PetsitterSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    preco por hora: { type: Number, require: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Petsitter', PetsitterSchema);