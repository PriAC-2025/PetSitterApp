

const Reservation = require('../models/Reservations');

exports.createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar agendamento", error });
    }
};

