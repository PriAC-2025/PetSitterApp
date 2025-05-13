
//src/screens/PetProfileScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PetProfileScreen = () => {
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [specialNeeds, setSpecialNeeds] = useState('');
    const [medications, setMedications] = useState('');

    const handleSubmit = () => {
        
        //Lógica para salvar as informações dos pets

        console.log({ petName, petAge, specialNeeds, medications });
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Nome do Pet"
                value={petName}
                onChangeText={setPetName}
                style={styles.input}
            />
            <TextInput 
                placeholder="Idade do Pet"
                value={petAge}
                onChangeText={setPetAge}
                style={styles.input}
            />
            <TextInput 
                placeholder="Necessidades Especiais"
                value={specialNeeds}
                onChangeText={setSpecialNeeds}
                style={styles.input}
            />
            <TextInput 
                placeholder="Medicamentos/Alergias"
                value={medications}
                onChangeText={setMedications}
                style={styles.input}
            />
            <Button title="Salvar Perfil" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 }
});

export default PetProfileScreen;