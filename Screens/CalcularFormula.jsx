import React, { useState , useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, Button, Text, Pressable, InputAccessoryView, Keyboard } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRoute } from '@react-navigation/native';
import { formStyles } from '../Styles/formStyles';
import { useTranslation} from 'react-i18next';
import '../translations/i18n';

export default function CalcularFormula({ navigation, route }) {
    const [currentValue, setCurrentValue] = useState('');
    const [loadedVariables, setLoadedVariables] = useState([]);
    const [currentVariable, setCurrentVariable] = useState('');
    const [currentOperation, setCurrentOperation] = useState('');
    const [currentOperationValue, setCurrentOperationValue] = useState(0);
    const formulaPath = route.params.path;
    const [loadedFormula, setLoadedFormula] = useState('');
    const {t, i18n} = useTranslation();
    const [currentLanguage,setLanguage] =useState('es');

    React.useEffect(() => {
        console.log('prepare calcular formula');
        const getFormula = async () => {
            FileSystem.readAsStringAsync(formulaPath)
            .then(async (data) => {     
                setLoadedFormula(String(data));  

            })
            .catch((error) => {
                console.log(error);
            });    
        }
        getFormula();
      
    }, []);

    useEffect(() => {
      if(loadedFormula != '')
        startCalculation();
    }, [loadedFormula]);

  
    const changeLanguage = value => {
        i18n
        .changeLanguage(value)
        .then(() => setLanguage(value))
        .catch(err => console.log(err));
    };

    const startCalculation = async () => {
        const regex = /V\d+/g;

        let variables = loadedFormula.match(/V\d+/g);
        if(variables == null) return;
        console.log('startCalculation variables', variables);
        setLoadedVariables(variables);
        setCurrentInput(variables[0]);
    }

    const setCurrentInput = (variable) => {
        console.log('current input ', variable);
        setCurrentVariable(variable);
        setCurrentValue('');
    }

    const resetCalculator = () => {
        console.log('resetCalculator');
        setCurrentValue(0);
    }

    const formatNumber = () => {
        console.log('formatNumber');
        var val = Math.round(Number(currentValue) *100) / 100;
        var parts = val.toString().split(".");

        return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");

    }

    const toggleNegative = () => {
        if(currentValue != '0')
            setCurrentValue(currentValue * -1);

        console.log('toggleNegative');
    }

    const percent = () => {
        if(currentValue != '0'
            && currentOperationValue == 0
            && currentOperation == '')
        {
            setCurrentOperationValue(currentValue);
            setCurrentOperation('percent');
            setCurrentValue(0);
        }
        console.log('percent');
    }

    const divide = () => {
        if(currentValue != '0'
            && currentOperationValue == 0
            && currentOperation == '')
        {
            setCurrentOperationValue(currentValue);
            setCurrentOperation('divide');
            setCurrentValue(0);
        }
    
        console.log('divide');
    }

    const multiply = () => {
        if(currentValue != '0'
            && currentOperationValue == 0
            && currentOperation == '')
        {
            setCurrentOperationValue(currentValue);
            setCurrentOperation('multiply');
            setCurrentValue(0);
        }
        console.log('multiply');
    }

    const substract = () => {
        if(currentValue != '0'
            && currentOperationValue == 0
            && currentOperation == '')
        {
            setCurrentOperationValue(currentValue);
            setCurrentOperation('substract');
            setCurrentValue(0);
        }
        console.log('substract');
    }

    const add = () => {
        if(currentValue != '0'
            && currentOperationValue == 0
            && currentOperation == '')
        {
            setCurrentOperationValue(currentValue);
            setCurrentOperation('add');
            setCurrentValue(0);
        }
        console.log('add');
    }

    const setValueToformula = () => {
        // replace variable with value
        console.log('setValueToformula', currentVariable);
        
        var newFormula = loadedFormula.replace(currentVariable, currentValue);
        console.log('newFormula', newFormula);  
        setLoadedFormula(newFormula);
        trySolveformula(newFormula);
    }

    const trySolveformula = (newFormula) => {
        console.log('trySolveformula', newFormula);
        let result = eval(newFormula);
        console.log('result', result);
        setCurrentValue(result);
    }

    const equals = () => {
        console.log('equals');
        console.log('currentOperation', currentOperation);
        console.log('currentOperationValue', currentOperationValue);
        console.log('currentValue', currentValue);
        if(currentOperation == 'divide') {
            setCurrentValue(currentOperationValue / currentValue);
        }
        if(currentOperation == 'multiply') {
            setCurrentValue(currentOperationValue * currentValue);
        }
        if(currentOperation == 'substract') {
            setCurrentValue(currentOperationValue - currentValue);
        }
        if(currentOperation == 'add') {
            setCurrentValue(parseFloat(currentOperationValue) + parseFloat(currentValue));
        }
        setCurrentOperationValue(0);
        setCurrentOperation('');
    
    }

    const addNumber = (number) => {
        var newNumber = (currentValue == '' ? '' : currentValue) + number;
        setCurrentValue(newNumber);
        console.log('addNumber', currentValue);
    }

    const addDecimalPoint = () => {
        if(currentValue == '0') {
            setCurrentValue('0.');
        }else{
            // test if there is already a decimal point
            if (currentValue.indexOf('.') == -1) {
                var newNumber = '' + (currentValue == 0 ? '' : currentValue) + '.';
                setCurrentValue(newNumber);
            }
        }
    }

    const openFunctions = () => {
        // navigate to functions screen
        navigation.navigate('ListaFunciones');
    }

    return (
    <View style={formStyles.container}>
      <View style={formStyles.screen}>
        <Text style={formStyles.formulaPreview}>{ t("formula_actual") + " = " + loadedFormula }</Text>
        <Text style={formStyles.screenText}>{ currentValue == '' ? 0 : formatNumber() }</Text>
      </View>
      <View style={formStyles.buttons}>
        <View style={formStyles.row}>
        <TextInput style={[formStyles.button,formStyles.inputNumeric,formStyles.fullWideInput]}
           keyboardType="numeric"
           placeholder={ currentVariable == '' ? t('constant_value') : currentVariable }           
           inputAccessoryViewID="Done"/>
          {Platform.OS === 'ios' ? (
        <>
          <InputAccessoryView nativeID="Done">
            <View style={formStyles.accessory}>
              <Button onPress={() => Keyboard.dismiss()} title={t("aceptar_boton")} />
            </View>
          </InputAccessoryView>
        </>
      ) : null} 
        </View>
        <View style={formStyles.row}>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => resetCalculator() }>
            <Text style={formStyles.buttonText}>C</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => toggleNegative() }>
            <Text style={formStyles.buttonText}>+/-</Text>
            </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => percent() }>
            <Text style={formStyles.buttonText}>%</Text>
            </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => divide() }>
            <Text style={formStyles.buttonText}>/</Text>
            </Pressable>
        </View>
        <View style={formStyles.row}>
          <Pressable style={formStyles.button} onPress={() => addNumber(7) }>
            <Text style={formStyles.buttonText}>7</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addNumber(8) }>
            <Text style={formStyles.buttonText}>8</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addNumber(9) }>
            <Text style={formStyles.buttonText}>9</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => multiply() }>
            <Text style={formStyles.buttonText}>x</Text>
          </Pressable>
        </View>
        <View style={formStyles.row}>
          <Pressable style={formStyles.button} onPress={() => addNumber(4) }>
            <Text style={formStyles.buttonText}>4</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addNumber(5) }>
            <Text style={formStyles.buttonText}>5</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addNumber(6) }>
            <Text style={formStyles.buttonText}>6</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => substract() }>
            <Text style={formStyles.buttonText}>-</Text>
          </Pressable>
        </View>
        <View style={formStyles.row}>
          <Pressable style={formStyles.button} onPress={() => addNumber(1) }>
            <Text style={formStyles.buttonText}>1</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addNumber(2) }>
            <Text style={formStyles.buttonText}>2</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addNumber(3) }>
            <Text style={formStyles.buttonText}>3</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.operationsButton]} onPress={() => add() }>
            <Text style={formStyles.buttonText}>+</Text>
          </Pressable>
        </View>
        <View style={formStyles.row}>
          <Pressable style={[formStyles.button]} onPress={() => addNumber(0) }>
            <Text style={formStyles.buttonText}>0</Text>
          </Pressable>
          <Pressable style={formStyles.button} onPress={() => addDecimalPoint() }>
            <Text style={formStyles.buttonText}>.</Text>
          </Pressable>
          <Pressable style={[formStyles.button,formStyles.wideButton,formStyles.operationsButton]} onPress={() => setValueToformula() }>
            <Text style={formStyles.buttonText}>{ t("definir_variable") }</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

