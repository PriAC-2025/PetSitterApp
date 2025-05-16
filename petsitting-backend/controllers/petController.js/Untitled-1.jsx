

const Pet = require('../models/Pet'); 

//Inserir um novo Pet

exports.createPet = async (req, res) => {
    try {
        const pet = new Pet(req.body);
        await pet.save();
        res.status(201).json({ message: 'Cadastro de pet criado com sucesso!', pet });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar Cadastro do pet', error });
    }
};

//Listar Pets

exports.getPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar cadastro dos pets', error });
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
        res.status(200).json({ message: 'Cadastro do pet atualizado com sucesso!', pet });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar cadastro do pet', error });
    }
};

//Deletar um cadastro de Pet

exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Cadastro do pet não encontrado' });
        res.status(200).json({ message: 'Cadastro do pet deletado com sucesso!', pet });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar cadastro do pet', error });
    }
};

