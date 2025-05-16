

const Petsitter = require('../models/Petsitter'); 

//Criar um novo cadastro de Petsitter

exports.createPetsitter = async (req, res) => {
    try {
        const petsitter = new Petsitter(req.body);
        await petsitter.save();
        res.status(201).json({ message: 'Cadastro do petsitter criado com sucesso!', petsitter });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar Cadastro do petsitter', error });
    }
};

//Listar os Petsitters cadastrados

exports.getPetsitters = async (req, res) => {
    try {
        const petsitters = await Petsitter.find();
        res.status(200).json(petsitters);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar Petsitters', error });
    }
};

//Acessar um cadastro de Petsitter pelo ID

exports.getPetsitterById = async (req, res) => {
    try {
        const petsitter = await Petsitter.findById(req.params.id);
        if (!petsitter) return res.status(404).json({ message: 'Petsitter não encontrado' });
        res.status(200).json(petsitter);
    } catch (error) {
        res.status(400).json({ message: 'Erro de acesso ao cadastro do petsitter', error });
    }
};

//Atualizar um cadastro de Petsitter

exports.updatePetsitter = async (req, res) => {
    try {
        const petsitter = await Petsitter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!petsitter) return res.status(404).json({ message: 'Petsitter não encontrado' });
        res.status(200).json({ message: 'Cadastro de petsitter atualizado com sucesso!', petsitter });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar cadastro do petsitter', error });
    }
};

//Deletar um cadastro 

exports.deletePetsitter = async (req, res) => {
    try {
        const petsitter = await Petsitter.findByIdAndDelete(req.params.id);
        if (!petsitter) return res.status(404).json({ message: 'Cadastro do petsitter não encontrado' });
        res.status(200).json({ message: 'Cadastro do petsitter deletado com sucesso!', petsitter });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar cadastro do petsitter', error });
    }
};

