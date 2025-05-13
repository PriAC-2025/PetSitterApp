

import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/api'; 
import { useParams } from 'react-router-dom'; 

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { userId } = useParams(); //uso de ID para acesso

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getUserProfile(userId); 
                setUser(response.data);
                setName(response.data.name); 
                setEmail(response.data.email); 
            } catch (error) {
                setError('Erro ao carregar perfil do usuário');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(userId, { name, email }); //Atualização de perfil 
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            setError('Erro ao atualizar perfil');
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Perfil do Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default UserProfile;