import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";

export default (pros) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais";
    const [isLoading, setIsLoading] = useState(true);
    const [profissional, setProfissional] = useState([]);

    const getProfissional = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            setProfissional(json);


        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):",
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProfissional();
    }, []);

    return (

        <View style={styles.profissionalContainer}>
            {isLoading ? (<ActivityIndicator size={50} color={'black'} />) :
                (
                    <View style={styles.profissionalContainerInterno}>
                        <View>
                            <TouchableOpacity onPress={() => getProfissional()} style={styles.reloadButton}>
                                <Text style={{ color: 'white' }}>Atualizar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={profissional}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <View style={styles.listaProfissional}>
                                    <Text style={styles.textStyle}>
                                        Nome: {item.nome}
                                    </Text>
                                    <Text style={styles.textStyle}>
                                        Telefone: {item.telefone}
                                    </Text>
                                    <Text style={styles.textStyle}>
                                        CPF: {item.cpf}
                                    </Text>

                                </View>
                            )}
                        />
                    </View>

                )}
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    reloadButton: {
        margin: 10,
        width: 300,
        height: 30,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    listaProfissional: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        width: 500

    },
    textStyle: {
        color: '#000',
        fontSize: 18,


    },
    profissionalContainer: {

        justifyContent: "center",
        alignItems: "center",


    },
    profissionalContainerInterno: {
        justifyContent: "center",
        alignItems: "center",
    }
});