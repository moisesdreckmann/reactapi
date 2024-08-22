import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Icon2 from 'react-native-vector-icons/Entypo.js';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons.js';
import Icon4 from 'react-native-vector-icons/Feather.js';

import Pizzas from '../../src/screens/Pizzas.jsx';
import Bebidas from '../../src/screens/Bebidas.jsx';
import MeusPedidos from '../../src/screens/MeusPedidos.jsx';
import Conta from '../../src/screens/Conta.jsx';

const Tab = createBottomTabNavigator();

const AuthenticatedScreens = () => {
  const [activeTab, setActiveTab] = useState('Pizzas');

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'Produtos') {
            iconComponent = <Icon name="pizza" size={size} color={activeTab === 'Pizzas' ? '#D90416' : color} />;

          } else if (route.name === 'Pedidos') {
            iconComponent = <Icon3 name="home-account" size={size} color={activeTab === 'Pedidos' ? '#D90416' : color} />;
          } else if (route.name === 'Conta') {
            iconComponent = <Icon4 name="user" size={size} color={activeTab === 'Conta' ? '#D90416' : color} />;
          }

          return iconComponent;
        },
        tabBarLabelStyle: {
          color: 'black',
        },
        tabBarStyle: { backgroundColor: '#FEEBE9' },
        tabBarActiveTintColor: '#8F8E8F',
        headerShown: false,
        activeTintColor: '#F21628',
      })}
    >
      <Tab.Screen
        name="Produtos"
        component={Pizzas}
        listeners={{
          tabPress: () => setActiveTab('Pizzas'),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={MeusPedidos}
        listeners={{
          tabPress: () => setActiveTab('Pedidos'),
        }}
      />
      <Tab.Screen
        name="Conta"
        component={Conta}
        listeners={{
          tabPress: () => setActiveTab('Conta'),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedScreens;
