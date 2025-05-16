

const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    specie: { type: String, required: true }
    breed: { type: String}
    size: { type: String, required: true }, //porte pequeno, porte médio, porte grande
    isNeutered: { type: Boolean, required: true },
    medications: [{ name: String, dosage: String }], //listar os medicamentos e dosagens que faz uso
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pet', PetSchema);
