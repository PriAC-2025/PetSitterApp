

//models/Pet.js 

const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    specie: { type: String, required: true }
    breed: { type: String}
    size: { type: String, required: true }, //pequeno, médio, grande
    isNeutered: { type: Boolean, required: true },
    medications: [{ name: String, dosage: String }], //se faz uso de medicamentos
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pet', PetSchema);