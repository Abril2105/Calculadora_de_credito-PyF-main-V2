import React  from "react";
import { Text, StyleSheet } from "react-native";
import  Constants from "expo-constants";

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#1c1c1e',
        flex: 1,
    },
    title: {
        color: '#4C97C7',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: Constants.statusBarHeight,
    },
    subHeader: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
        marginTop: 35
        
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10
      },
    picker: {
        backgroundColor: 'white',
        height: 40,
        width: 140,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10
    },
    pickerText: {
        textAlignVertical: 'center'
    },
    button: {
        backgroundColor: '#4C97C7',
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center',
        width: 90,
        height: 50,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        lineHeight: 50,
        fontSize: 17
    },
    results: {
        color: '#BD75C2',
        fontSize: 20,
        marginLeft: 5,
        marginTop: 35,
    },
    textoResults: {
        color: 'white',
        fontSize: 20,
        marginLeft: 5,
        marginTop: 35,
        alignSelf : 'center'
    }
})

export default styles