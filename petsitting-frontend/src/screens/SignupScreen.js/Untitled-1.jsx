

//SignupScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SignupScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [petSpecies, setPetSpecies] = useState('');
    const [careNeeds, setCareNeeds] = useState('');

    const handleSignup = () => {

        // Lógica para criar conta

        console.log({ name, email, password, petSpecies, careNeeds });
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput 
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <TextInput 
                placeholder="Espécie do Pet"
                value={petSpecies}
                onChangeText={setPetSpecies}
                style={styles.input}
            />
            <TextInput 
                placeholder="Necessidade de Cuidados"
                value={careNeeds}
                onChangeText={setCareNeeds}
                style={styles.input}
            />
            <Button title="Criar Conta" onPress={handleSignup} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 }
});

export default SignupScreen;