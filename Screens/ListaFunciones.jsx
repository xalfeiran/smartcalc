import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, Pressable, View, Image, Button, Alert } from 'react-native';
import { formStyles } from '../Styles/formStyles';
import * as FileSystem from 'expo-file-system';
import {useTranslation} from 'react-i18next';
import '../translations/i18n';


export default function ListaFunciones({ navigation }) {

  const [currentValue, setCurrentValue] = useState(0);
  const [listadoFunciones, setListadoFunciones] = useState([]);
  const {t, i18n} = useTranslation();
  const [currentLanguage,setLanguage] =useState('es');

  // when loaded, get the list of functions
    React.useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
              <Button onPress={() => LimpiarFormulas() } title={t("limpiar_formulas")} />
            ),
          });

        // when focuses, get the list of functions
        navigation.addListener('focus', () => {
        const getFunctions = async () => {
            let functions = [];
            FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
            .then((files) => {
                files.forEach((file) => {                    
                    if(file.endsWith('txt')){
                        // remove extension from the file name
                        let name = file.replace('.txt', '');
                        functions.push({key: file, name: name, path: FileSystem.documentDirectory + file});
                        
                    }
                });
                setListadoFunciones(functions);
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
        getFunctions();
    });
    }, []);

  
  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const LimpiarFormulas = () => {

    // confirm if the user wants to delete all the formulas
    Alert.alert(
        t('confirm_delete'),
        t('confirm_delete_all'),
        [
            {
                text: t('cancel'),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: t('delete'),
                onPress: () => {
                    // delete all the formulas
                    FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
                    .then((files) => {
                        console.log(files);
                        files.forEach((file) => {
                            if(file.endsWith('txt')){
                                FileSystem.deleteAsync(FileSystem.documentDirectory + file)
                                .then(() => {
                                    console.log('deleted');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            }
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                },
            },
        ],
        {cancelable: false},
    );
    }



    const addFunction = () => {
        navigation.navigate('CrearFuncion');
    }

    const runFormula = (path) => {
        navigation.navigate('CalcularFormula', { path });
    }


    return (
        <View style={formStyles.container}>
        <View style={formStyles.buttons}>
            <View style={[formStyles.row, formStyles.button,formStyles.openFunctionsButton]}>          
                <Image source={require('../assets/function-definition-2.png')} style={formStyles.functionsIcon} />
                <Text style={formStyles.buttonText}>{t('my_functions')}</Text>
                <Pressable onPress={() => addFunction() }>
                    <Image source={require('../assets/icon-add.png')} style={formStyles.normalIcon} />
                </Pressable>
            </View>
            {listadoFunciones && listadoFunciones.map((funcion) => {
                return (
                    <View style={[formStyles.row, formStyles.button,formStyles.listItemButton]} key={funcion.key}>          
                        <Text style={formStyles.buttonWhiteText}>{ funcion.name }</Text>
                        <Pressable onPress={() => runFormula( funcion.path ) }>
                            <Image source={require('../assets/icon-go.png')} style={formStyles.normalWhiteIcon} />
                        </Pressable>
                    </View>
                );
            })}
            { listadoFunciones.length == 0 && (
                <View style={[formStyles.row]}>    
                <Text>{t('functions_list_empty')}</Text>
                </View>
            )}
            
        </View>
        <StatusBar style="auto" />
        </View>
    );
}