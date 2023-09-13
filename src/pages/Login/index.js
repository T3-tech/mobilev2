import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';


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

        <View style={styles.container}>
            <Image style={styles.img} source={require('../../img/image.png')} />
            <View style={styles.containerInput}>
                <TextInput style={styles.inputLogin} placeholder='LOGIN'
                    placeholderTextColor={"#fff"}>
                </TextInput>

                <TextInput style={styles.inputLogin} placeholder='SENHA'
                    placeholderTextColor={"#fff"}>
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



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    containerInput: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 90
    },
    inputLogin: {
        borderRadius: 10,
        width: 290,
        height: 50,
        borderWidth: 2,
        borderColor: "#fff",
        marginTop: 25,
        fontSize: 20,
        padding: 5,


    },
    botao: {
        width: 230,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#fff",
        marginTop: 20

    },
    btnArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    img: {
        width: 500
    }

});