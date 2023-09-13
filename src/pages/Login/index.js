import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, KeyboardAvoidingView } from 'react-native';


export default function Login({
    navigation
}) {


    const entrar = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Tab' }]
        })
    }
    return (
        <KeyboardAvoidingView >
            <View style={styles.container}>
                <Image style={styles.img} source={require('../../img/image.png')} />
                <View style={styles.containerInput}>
                    <TextInput style={styles.inputLogin} placeholder='LOGIN'
                        placeholderTextColor={"#000"}>
                    </TextInput>

                    <TextInput style={styles.inputLogin} placeholder='SENHA'
                        placeholderTextColor={"#000"}>
                    </TextInput>

                    <TouchableOpacity style={styles.botao} onPress={() => entrar()}>
                        <View style={styles.btnArea}>
                            <Text style={styles.textoBotao}>
                                ENTRAR
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        </KeyboardAvoidingView>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',

    },
    containerInput: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    inputLogin: {
        borderRadius: 10,
        width: 290,
        height: 50,
        borderWidth: 2,
        borderColor: "#000",
        marginTop: 25,
        fontSize: 20,
        padding: 5,


    },
    botao: {
        width: 230,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#000",
        marginTop: 50

    },
    btnArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    img: {
        width: 400,
        height: 350,

    }

});