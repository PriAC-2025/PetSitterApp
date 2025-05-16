

import React from 'react';
import { Platform } from 'react-native'; 
import WebNavigator from './navigation/AppNavigator'; 
import MobileNavigator from './navigation/MobileNavigator'; 

const App = () => {
    const isMobile = Platform.OS === 'web' ? false : true; 

    return isMobile ? <MobileNavigator /> : <WebNavigator />;
};

export default App;
