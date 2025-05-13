

//PetsitterDetailScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PetsitterDetailScreen = ({ route }) => {
    const { petsitterId } = route.params; // obter o id do petsitter

    //Mock de detalhes do petsitter

    const petsitterDetails = {
        name: 'Felipe Costa',
        bio: 'Experiência com cães e gatos, apaixonado por animais.',
        rating: 4.8,
        price: "R$ 40,00/dia",
    };

    const handleReserve = () => {

        //Lógica para reservar o petsitter

        console.log("Reserva feita com sucesso!");
    };

    return (
        <View style={styles.container}>
            <Text>Nome: {petsitterDetails.name}</Text>
            <Text>Bio: {petsitterDetails.bio}</Text>
            <Text>Avaliação: {petsitterDetails.rating}</Text>
            <Text>Preço: {petsitterDetails.price}</Text>
            <Button title="Reservar" onPress={handleReserve} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
});

export default PetsitterDetailScreen;