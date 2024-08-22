import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../preload/Preload';
import SignIn from '../../src/screens/SignIn';
import Cadastrar from '../../src/screens/Cadastrar';
import EsqueceuSenha from '../screens/EsqueceuSenha';
import AuthenticatedScreens from '../navigation/AuthenticatedScreens';
import Carrinho from '../screens/Carrinho';

const Stack = createStackNavigator();

const TabRouter = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Cadastrar" component={Cadastrar} />
        <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} />
        <Stack.Screen name="AuthenticatedScreens" component={AuthenticatedScreens} />
        <Stack.Screen name="Carrinho" component={Carrinho} />
      </Stack.Navigator>
  );
};

export default TabRouter;
