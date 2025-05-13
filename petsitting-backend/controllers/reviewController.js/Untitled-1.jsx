

const Review = require('../models/Review'); 

//Criar uma nova Avaliação

exports.createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ message: 'Avaliação criada com sucesso!', review });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar Avaliação', error });
    }
};

//Listar as Avaliações

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao listar Avaliações', error });
    }
};

//Acessar uma Avaliação pelo ID

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Avaliação não encontrada' });
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao obter Avaliação', error });
    }
};

//Atualizar uma Avaliação

exports.updateReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ message: 'Avaliação não encontrada' });
        res.status(200).json({ message: 'Avaliação atualizada com sucesso!', review });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar Avaliação', error });
    }
};

//Deletar uma Avaliação

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Avaliação não encontrada' });
        res.status(200).json({ message: 'Avaliação deletada com sucesso!', review });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar Avaliação', error });
    }
};