

import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const PetsitterListScreen = ({ navigation }) => {
    const petsitters = [
        { id: '1', name: 'Felipe Costa', rating: 4.8 },
        { id: '2', name: 'Gabriela Alencar', rating: 5.0 },

    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={petsitters}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>{item.name}</Text>
                        <Text>Avaliação: {item.rating}</Text>
                        <Button title="Ver Detalhes" onPress={() => navigation.navigate('PetsitterDetail', { petsitterId: item.id })} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: { marginBottom: 16, padding: 16, borderColor: 'gray', borderWidth: 1 },
});

export default PetsitterListScreen;
