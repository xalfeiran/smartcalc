import { View, Pressable, Text, Image, TextInput,TouchableHighlight, Button, Keyboard,InputAccessoryView } from 'react-native';
import React, { useState } from 'react';
import { formStyles } from '../Styles/formStyles';
import {useTranslation} from 'react-i18next';
import * as FileSystem from 'expo-file-system';
import '../translations/i18n';

export default function CrearFuncion({ navigation }) {

  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('es');
  const [showToolbar, setShowToolbar] = useState(false);
  const [lastOperator, setLastOperator] = useState(true);
  const [formula, setFormula] = useState('');
  const [currentOperation, setCurrentOperation] = useState('multiply');
  const [selectedConstant, setSelectedConstant] = useState(false);
  const [calculatedValue, setCalculatedValue] = useState(0);
  const [currentFormula, setCurrentFormula] = useState('');
  const [fileName, setFileName] = useState('');
  const [currentVariableIndex, setCurrentVariableIndex] = useState(1);
  
  React.useEffect(() => {
    console.log('useEffect', fileName);
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => saveFormula() } title={t("salvar_formula")} />
      ),
    });
  }, [navigation, fileName]);

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
    if(operation == 'C'){
      setSelectedConstant(true);

    }else{
      setCurrentOperation(operation);
      setCurrentFormula(currentFormula + ' ' + operation);
    }
  }

  const addConstant = () => {
    console.log('addConstant');
    setCurrentFormula(currentFormula + '' + selectedConstant );
    setSelectedConstant(false);

  }

  const addVariable = () => {
    console.log('addVariable');
    setCurrentFormula(currentFormula + ' V' + currentVariableIndex );
    setCurrentVariableIndex(currentVariableIndex + 1);
  }

  const saveFormula = () => {

    if(fileName == ''){
      alert('Please enter a name for the formula');
      return;
    }

    console.log('save formula by name ', fileName);

    if(currentFormula == ''){
      alert('Please enter a formula');
      return;
    }

    console.log('saveFormula', currentFormula);

    //save formula to file named as formula_1.txt
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + fileName + '.txt', currentFormula)
    .then(() => {
      console.log('FILE SAVED' + FileSystem.documentDirectory +  fileName + '.txt' );
      navigation.pop();
    })
    .catch(err => {
      console.log(err);
    });

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

    return (
      <View style={[formStyles.row, formStyles.inputCantidad]}>
        <View style={formStyles.sampleValueCol}>
          <Text style={formStyles.superText}>{t('formula')}</Text>
          <Text style={formStyles.sampleValue}>{ currentFormula }</Text>    
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
          <Pressable style={[formStyles.smallButton,formStyles.operationsButton]} onPress={ () => selectOperation('+') }>
              <Text style={formStyles.buttonText}>+</Text>
          </Pressable>
          <Pressable style={[formStyles.smallButton,formStyles.operationsButton]} onPress={ () => selectOperation('-') }>
              <Text style={formStyles.buttonText}>-</Text>
          </Pressable>
          <Pressable style={[formStyles.smallButton,formStyles.operationsButton]} onPress={ () => selectOperation('*') }>
              <Text style={formStyles.buttonText}>*</Text>
          </Pressable>
          <Pressable style={[formStyles.smallButton,formStyles.operationsButton]} onPress={ () => selectOperation('/') }>
              <Text style={formStyles.buttonText}>/</Text>
          </Pressable>
          <Pressable style={[formStyles.smallButton,formStyles.operationsButton]} onPress={ () => selectOperation('(') }>
              <Text style={formStyles.buttonText}>(</Text>
          </Pressable>
          <Pressable style={[formStyles.smallButton,formStyles.operationsButton]} onPress={ () => selectOperation(')') }>
              <Text style={formStyles.buttonText}>)</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const displayStorage = () => {
    return (
      <View style={formStyles.backRowSelectOperation}>
        <View style={formStyles.row}>
          <Text style={formStyles.superText}>{ t('select_storage')}</Text>
        </View>
        
        <View style={formStyles.row}>
          { !selectedConstant && (
              <Pressable style={[formStyles.button,formStyles.wideButton, formStyles.operationsButton]} onPress={ () => selectOperation('C') }>
                <Text style={formStyles.buttonText}>{ t('constant') }</Text>
              </Pressable>
          )}
          { selectedConstant && (
          <TextInput style={[formStyles.button,formStyles.inputNumeric,formStyles.wideInput]}
           keyboardType="numeric"
           onChangeText={(value) => setSelectedConstant(value)}
           onEndEditing={() => addConstant()}
           placeholder={t('constant_value')}            
           inputAccessoryViewID="Done"/>
          )}
          {Platform.OS === 'ios' ? (
        <>
          <InputAccessoryView nativeID="Done">
            <View style={formStyles.accessory}>
              <Button onPress={() => Keyboard.dismiss()} title={t("aceptar_boton")} />
            </View>
          </InputAccessoryView>
        </>
      ) : null}          
          <Pressable style={[formStyles.button,formStyles.wideButton,formStyles.operationsButton]} onPress={ () => addVariable() }>
              <Text style={formStyles.buttonText}>{ t('variable') }</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={formStyles.container}>
      <View style={formStyles.buttons}>
        <View style={[formStyles.row, formStyles.inputCantidad]}>
          <TextInput style={formStyles.input} 
            onChangeText={value => setFileName(value)} 
            placeholder={t('nombre_formula')} />
        </View>

        <View style={[formStyles.row, formStyles.right]}>
          { displaytoolbar() }
        </View> 
        <View style={[formStyles.row, formStyles.right]}>
          { displayStorage() }
        </View> 
        
        <View style={[formStyles.row]}>
        
        </View>
        { !showToolbar && lastOperator && showResult() }
        <Text>{ fileName }</Text>
      </View>
    </View>
  );
}