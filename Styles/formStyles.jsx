import {StyleSheet, Dimensions} from 'react-native';

export const formStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },

      screen : {
        marginTop: 0,
        width: '100%',
        backgroundColor: '#d0d0d0',
        justifyContent: 'flex-end',
        height: 120,
      },

    screenText: {
        fontSize: 42,
        color: '#000',
        textAlign: 'right',
        padding: 10,
        fontWeight: '300',
    },

    formulaPreview : {
        fontSize: 18,
        color: '#999',
        textAlign: 'right',
        padding: 10,
        fontWeight: '300',
    },

    row : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
    },

    backRowSelectOperation : {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
    },

    right : {
        textAlign: 'right',
    },

    sampleValueCol : {
        marginTop: 3,
    },

    button : {
        height: 68,
        width: 68,
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
    },

    smallButton : {
        height: 48,
        width: 48,
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
    },

    wideButton : {
        width: 150,
    },

    fullWideButton : {
        width: 300,
    },

    wideInput : {
        width: 150,
        borderColor : '#BBDEFB',
        borderWidth: 3,
        padding: 4,
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    fullWideInput : {
        width: 300,
        borderColor : '#BBDEFB',
        borderWidth: 3,
        padding: 4,
        borderRadius: 10,
        backgroundColor: '#fff',
    },

    openFunctionsButton : {
        flexDirection: 'row',
        width:'95%',
        minWidth: 50,
        alignSelf: 'stretch',
        backgroundColor: '#DCEDC8',
    },

    listItemButton : {
        flexDirection: 'row',
        width:'95%',
        minWidth: 50,
        alignSelf: 'stretch',
        backgroundColor: '#64B5F6',
    },

    functionsIcon : {
        width: 30,
        height: 30,
        alignSelf: 'center',
        tintColor: '#999',
    },

    normalIcon : {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },

    normalWhiteIcon : {
        width: 30,
        height: 30,
        alignSelf: 'center',
        tintColor: '#fff',
    },

    pillIcon : {
        width: 25,
        height: 25,
        position: 'absolute',
        top: -10,
        right: -10,
        padding:4,
        backgroundColor: '#000',
        borderRadius: 20,
        alignSelf: 'center',
        tintColor: '#fff',
    },

    operationsButton : {
        backgroundColor: '#BBDEFB',
        color: '#fff',
    },

    buttons : {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 6,
        marginHorizontal: 6,
        justifyContent: 'center',
    },

    sampleValue : {
        fontSize: 20,
        color: '#999',
        textAlign: 'right',
        padding: 10,
    },

    inputCantidad : {
        borderColor : '#DCEDC8',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        width:'95%',
        height: 70,
        minWidth: 50,
        alignSelf: 'stretch',
    },

    inputOperacion : {
        borderColor : '#4FC3F7',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        width:'45%',
        height: 70,
        minWidth: 50,
        alignSelf: 'stretch',
    },

    superText : {
        fontSize: 10,
    },

    buttonText : {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: '#666',
        fontWeight: '300',
    },

    buttonWhiteText : {
        textAlign: 'center',
        padding: 10,
        fontSize: 20,
        color: '#fff',
        fontWeight: '300',
    },

    accessory: {
        width: Dimensions.get('window').width,
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8
      }
});