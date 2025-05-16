

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import PetForm from '../components/Pet/PetForm';
import PetsitterList from '../components/Petsitters/PetsitterList';

const Stack = createNativeStackNavigator();

const MobileNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Add Pet" component={PetForm} />
                <Stack.Screen name="Petsitters" component={PetsitterList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MobileNavigator; 
