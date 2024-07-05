import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/Routes';

import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#6b0e99" barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

