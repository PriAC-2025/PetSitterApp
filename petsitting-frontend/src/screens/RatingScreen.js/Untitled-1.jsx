

//src/screens/RatingScreen.js

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const RatingScreen = () => {
    const [rating, setRating] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {

        //Lógica para envio de avaliações 

        console.log({ rating, feedback });
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Avalie de 1 a 5"
                value={rating}
                onChangeText={setRating}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput 
                placeholder="Comentários"
                value={feedback}
                onChangeText={setFeedback}
                style={styles.input}
            />
            <Button title="Enviar Avaliação" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, padding: 8 }
});

export default RatingScreen;