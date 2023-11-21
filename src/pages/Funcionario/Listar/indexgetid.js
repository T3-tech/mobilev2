import { Text, FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default ({ route }) => {
    const { id } = route.params;
    const [profissional, setprofissional] = useState('');

    const getProfissionalPorId = async () => {

        const response = await fetch(
            `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais/${id}`
        );
        const json = await response.json();
        setprofissional(json);



    }

    useEffect(() => {
        getProfissionalPorId();
    }, []);
    return (
        <SafeAreaView style={styles.containerExterno}>
            <Text style={styles.titulo}>Informações detalhadas</Text>
            <View style={styles.container}>
                <View style={styles.containerInfo}>
                    <Text style={styles.textStyle}>NOME: {profissional.nome}</Text>
                    <Text style={styles.textStyle}>CPF: {profissional.cpf}</Text>
                    <Text style={styles.textStyle}>TELEFONE: {profissional.telefone}</Text>
                    <Text style={styles.textStyle}>SERVIÇOS PRESTADOS</Text>
                    <FlatList data={profissional.listaServico}
                        keyExtractor={({ idServico }) => idServico}
                        renderItem={({ item }) => (
                            <Text style={styles.textStyle}>{item.nomeSevico}</Text>
                        )}
                    >

                    </FlatList>
                </View>
            </View>

        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    containerExterno: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        justifyContent: "center",
        backgroundColor: "#6E6E6E",
        height: 230,
        borderRadius: 10,
        width: 350,

    },
    containerInfo: {
        alignItems: "center",
    },
    textStyle: {
        color: "#fff",
        fontSize: 20,
    },
    titulo: {
        fontSize: 25
    }


});