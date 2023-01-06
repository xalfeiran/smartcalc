import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Calculadora from './Screens/Calculadora';
import ListaFunciones from './Screens/ListaFunciones';
import CrearFuncion from './Screens/CrearFuncion';
import CalcularFormula from './Screens/CalcularFormula';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { t } from 'i18next';

export default function App() {

  const Stack = createNativeStackNavigator();

  return(
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Calculadora">
      <Stack.Screen name="Calculadora" component={Calculadora} />
      <Stack.Screen name="ListaFunciones" options={{ title: t("my_functions") }} component={ListaFunciones}  />
      <Stack.Screen name="CrearFuncion" options={{ title: t("new_function") }} component={CrearFuncion} />
      <Stack.Screen name="CalcularFormula" component={CalcularFormula}  />
    </Stack.Navigator>
  </NavigationContainer>
  );
  
}