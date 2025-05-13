

const Pet = require('../models/Pet'); 

//Inserir um novo Pet

exports.createPet = async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json({ message: 'Pet criado com sucesso!', pet });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar Pet', error });
    }
};

//Listar Pets

exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar Pets', error });
    }
};

//Acessar cadastro de um Pet pelo ID

exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet não encontrado' });
        res.status(200).json(pet);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao obter Pet', error });
    }
};

//Atualizar cadastro de um Pet

exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pet) return res.status(404).json({ message: 'Pet não encontrado' });
        res.status(200).json({ message: 'Pet atualizado com sucesso!', pet });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar Pet', error });
    }
};

//Deletar um cadastro de Pet

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet não encontrado' });
        res.status(200).json({ message: 'Pet deletado com sucesso!', pet });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar Pet', error });
    }
};