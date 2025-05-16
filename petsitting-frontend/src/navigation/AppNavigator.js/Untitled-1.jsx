

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import PetForm from '../components/Pet/PetForm';
import PetsitterList from '../components/Petsitters/PetsitterList';

const WebNavigator = () => {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/add-pet" component={PetForm} />
                <Route path="/petsitters" component={PetsitterList} />

            </Switch>
        </Router>
    );
};

export default WebNavigator;
