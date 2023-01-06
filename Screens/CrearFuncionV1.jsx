import { View, Pressable, Text, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { formStyles } from '../Styles/formStyles';
import {useTranslation} from 'react-i18next';
import '../translations/i18n';

export default function CrearFuncion({ navigation }) {

  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('es');
  const [showToolbar, setShowToolbar] = useState(false);
  const [lastOperator, setLastOperator] = useState(true);
  const [currentOperation, setCurrentOperation] = useState('multiply');
  const [calculatedValue, setCalculatedValue] = useState(0);
  
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const editOperacion = () => {
    console.log('editOperacion');
    setShowToolbar(true);
  }

  const selectOperation = (operation) => {
    console.log('selectOperation');
    setCurrentOperation(operation);
    setShowToolbar(false);
  }

  const selectedOperation = () => {
    let operator = '';
    switch(currentOperation){
      case 'add':
        operator = '+';
        break;
      case 'substract':
        operator = '-';
        break;
      case 'multiply':
        operator = '*';
        break;
      case 'divide':
        operator = '/';
        break;
    }
    return(
      <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => editOperacion()} >
        <Image source={require('../assets/icon-edit.png')} style={formStyles.pillIcon} />
        <Text style={formStyles.buttonText}>{ operator }</Text>
      </Pressable>
    );
  }

  const showResult = () => {

    // calculate result
    let currentValue = 5;
    let result = 0;
    switch(currentOperation){
      case 'add':
        result = calculatedValue + Number(currentValue);
        break;
      case 'substract':
        result = calculatedValue - Number(currentValue);
        break;
      case 'multiply':
        result = calculatedValue * Number(currentValue);
        break;
      case 'divide':
        result = calculatedValue / Number(currentValue);
        break;
    }
    //esetCalculatedValue(result);

    console.log('showResult');
    return (
      <View style={[formStyles.row, formStyles.inputCantidad]}>
        <View style={formStyles.sampleValueCol}>
          <Text style={formStyles.superText}>{t('cantidad')}</Text>
          <Text style={formStyles.sampleValue}>{ calculatedValue }</Text>    
        </View>
        <TextInput style={formStyles.input} placeholder={t('calculated_result')} />         
      </View>
    )
  }

  const displaytoolbar = () => {
    return (
      <View style={formStyles.backRowSelectOperation}>
        <View style={formStyles.row}>
          <Text style={formStyles.superText}>{ t('select_operation')}</Text>
        </View>
        <View style={formStyles.row}>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={ () => selectOperation('add') }>
              <Text style={formStyles.buttonText}>+</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={ () => selectOperation('substract') }>
              <Text style={formStyles.buttonText}>-</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={ () => selectOperation('multiply') }>
              <Text style={formStyles.buttonText}>*</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={ () => selectOperation('divide') }>
              <Text style={formStyles.buttonText}>/</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={formStyles.container}>
      <View style={formStyles.buttons}>
        <View style={[formStyles.row, formStyles.button,formStyles.openFunctionsButton]}>          
          <Image source={require('../assets/function-definition-2.png')} style={formStyles.functionsIcon} />
          <Text style={formStyles.buttonText}>{t('new_function')}</Text>               
        </View>
        <View style={[formStyles.row, formStyles.inputCantidad]}>
          <View style={formStyles.sampleValueCol}>
            <Text style={formStyles.superText}>{t('cantidad')}</Text>
            <TextInput style={formStyles.sampleValue}>10</TextInput>    
          </View>
          <TextInput style={formStyles.input} placeholder={t('variable_name')} />         
        </View> 
        <View style={[formStyles.row, formStyles.right]}>
          { !showToolbar && selectedOperation()}
          { showToolbar && ( displaytoolbar() )}
        </View> 
        <View style={[formStyles.row, formStyles.inputCantidad]}>
          <View style={formStyles.sampleValueCol}>
            <Text style={formStyles.superText}>{t('cantidad')}</Text>
            <Text style={formStyles.sampleValue}>10</Text>    
          </View>
          <TextInput style={formStyles.input} placeholder={t('variable_name')} /> 
        </View> 
        <View style={[formStyles.row]}>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => equals() }>
            <Text style={formStyles.buttonText}>=</Text>
          </Pressable>
        </View>
        { !showToolbar && lastOperator && showResult() }
      </View>
    </View>
  );
}