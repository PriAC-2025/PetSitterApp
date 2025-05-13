

export default api;

const API_URL = 'http://localhost:5000/api'; 

//Função para buscar a lista de Petsitters

export const fetchPetSitters = async () => {
    const response = await fetch(`${API_URL}/petsitters`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

//Função para criar agendamento

export const createReservation = async (reservationData) => {
    const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar reserva');
    }

    return response.json();
};

//Função para inserir avaliação

export const submitReview = async (reviewData) => {
    const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
        throw new Error('Erro ao enviar avaliação');
    }

    return response.json();
};

//Função para preencher formulário de características do pet

export const addPet = async (petData) => {
    const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
    });

    if (!response.ok) {
        throw new Error('Erro ao adicionar pet');
    }

    return response.json();
};

//Função para preencher formulário de características do petsitter

export const addPetSitter = async (petsitterData) => {
    const response = await fetch(`${API_URL}/petsitters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(petsitterData),
    });

    if (!response.ok) {
        throw new Error('Erro ao adicionar petsitter');
    }

    return response.json();
};


