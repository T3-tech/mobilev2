import { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default (pros) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais";
    const [isLoading, setIsLoading] = useState(true);
    const [profissional, setProfissional] = useState([]);

    const getProfissional = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            setProfissional(json);
            console.log(json)

        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:26 ~ getProfissional ~ console.log(error):",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const deteleProfissional = async (id) => {
        try {
            await fetch(`${URL}/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:40 ~ getProfissional ~ console.log(error):"
            );
        } finally {
            getProfissional();
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
                                    <View style={styles.icon}>
                                        <View >
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
                                        <View>
                                            <Ionicons
                                                name="create-outline"
                                                size={25}
                                                color={"blue"}
                                                onPress={() =>
                                                    pros.navigation.navigate(

                                                    )
                                                }

                                            />
                                            <Ionicons
                                                name="trash-outline"
                                                size={25}
                                                color={"red"}
                                                onPress={() =>
                                                    deteleProfissional(item.id)
                                                }
                                            />
                                        </View>
                                    </View>

                                </View>
                            )}
                        />

                        <FlatList
                            data={profissional.listaServico}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <View>
                                    <Text style={styles.textStyle}>
                                        {item.nomeSevico}
                                    </Text>
                                </View>
                            )}
                        >

                        </FlatList>
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
        width: 350,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc"

    },
    textStyle: {
        color: '#000',
        fontSize: 15
    },
    profissionalContainer: {

        justifyContent: "center",
        alignItems: "center"
    },
    profissionalContainerInterno: {
        justifyContent: "center",
        alignItems: "center"
    },
    listaProfissionalInterna: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    icon: {
        flexDirection: "row",
        justifyContent: "space-between",

    }


});