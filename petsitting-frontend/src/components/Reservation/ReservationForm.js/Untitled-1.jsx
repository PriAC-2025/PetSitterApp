

import React, { useEffect, useState } from 'react';
import { getPetsitters, createReservation } from '../../services/api'; 
import './ReservationForm.css'; //Recurso opcional

const ReservationForm = () => {
    const [petsitters, setPetsitters] = useState([]);
    const [selectedPetsitter, setSelectedPetsitter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchPetsitters = async () => {
            try {
                const response = await getPetsitters();
                setPetsitters(response.data);
            } catch (error) {
                setError('Erro ao carregar petsitters');
            }
        };

        fetchPetsitters();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reservationData = {
                petsitterId: selectedPetsitter,
                startDate,
                endDate,
            };
            await createReservation(reservationData); 
            setSuccessMessage('Reserva criada com sucesso!');
            setSelectedPetsitter('');
            setStartDate('');
            setEndDate('');
        } catch (error) {
            setError('Erro ao criar reserva');
        }
    };

    return (
        <div className="reservation-form">
            <h2>Formulário de Reserva</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="petsitter">Escolha um Petsitter:</label>
                    <select
                        id="petsitter"
                        value={selectedPetsitter}
                        onChange={(e) => setSelectedPetsitter(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a petsitter</option>
                        {petsitters.map((petsitter) => (
                            <option key={petsitter._id} value={petsitter._id}>
                                {petsitter.name} {}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="startDate">Data de Início:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endDate">Data de Fim:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Criar Reserva</button>
            </form>
        </div>
    );
};

export default ReservationForm;