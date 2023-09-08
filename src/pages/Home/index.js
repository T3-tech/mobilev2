import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, Header, View } from 'react-native';


export default props => (

    <SafeAreaView>
        <View style={styles.header}>
            <StatusBar auto />
            <Text style={styles.texto}>Agendamento</Text>
        </View>

    </SafeAreaView>


)


const styles = StyleSheet.create({
    header: {
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    texto: {
        color: "#fff",
        fontSize: 20
    }
})