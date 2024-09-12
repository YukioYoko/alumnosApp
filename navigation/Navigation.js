import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas
import Horario from '../screens/Horario';
import Login from '../screens/Login';
import MateriaScreen from '../screens/MateriaScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        {/* Pantallas sin encabezado */}
        <Stack.Screen 
          name="LogIn" 
          component={Login}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Horario" 
          component={Horario} 
          options={{ headerShown: false }} 
        />

        {/* Pantallas con encabezado */}
        <Stack.Screen 
          name="MateriaScreen" 
          component={MateriaScreen} 
          options={{ headerShown: true }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
