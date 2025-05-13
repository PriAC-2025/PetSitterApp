

//models/Reservation.js 

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    petsitter: { type: mongoose.Schema.Types.ObjectId, ref: 'Petsitter', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    petName: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
    reservationDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    meetingType: { type: String, enum: ['In-person', 'Video Call'], required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reservation', ReservationSchema);

