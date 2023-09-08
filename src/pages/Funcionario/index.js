import React from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar, Header, View } from 'react-native';


export default props => (

    <NavigationContainer>
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.texto}>Funcionario</Text>
            </View>
        </SafeAreaView>

    </NavigationContainer>

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