import {
    Text,
    ActivityIndicator,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [servico, setServico] = useState([]);
    const url = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos";

    const getServico = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setServico(json);
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:25 ~ getServico ~ console.log(error):"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const deteleServico = async (id) => {
        try {
            await fetch(`${url}/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:39 ~ deteleServico ~ console.log(error):"
            );
        } finally {
            getServico();
        }
    };

    useEffect(() => {
        getServico();
    }, []);

    return (
        <>
            <View style={styles.servicoContainer}>
                {isLoading ? (
                    <ActivityIndicator size={50} color={"black"} />
                ) : (
                    <>
                        <View style={styles.reloadBotton}>
                            <TouchableOpacity onPress={() => getServico()}>
                                <Text style={{ color: "white" }}>
                                    Atualizar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={servico}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <View style={styles.listServico}>
                                    <Text style={styles.textServico}>
                                        {item.nome} Valor: {item.valor}R$
                                    </Text>
                                    <View style={styles.ViewIcon}>
                                        <Text>
                                            Profissional:{" "}
                                            {item.nomeProfissional}
                                        </Text>
                                        <View>
                                            <Ionicons
                                                name="create-outline"
                                                size={25}
                                                color={"blue"}
                                                onPress={() =>
                                                    props.navigation.navigate(
                                                        "EditarServico",
                                                        {
                                                            id: item.id,
                                                            nome: item.nome,
                                                            valor: item.valor,
                                                            idProfissional:
                                                                item.idProfissional,
                                                            navigator:
                                                                props.navigation,
                                                        }
                                                    )
                                                }
                                            />
                                            <Ionicons
                                                marginTop
                                                name="trash-outline"
                                                size={25}
                                                color={"red"}
                                                onPress={() =>
                                                    Alert.alert(
                                                        "Deletar Serviço",
                                                        "Deseja deletar o serviço?",
                                                        [
                                                            {
                                                                text: "Não",
                                                                onPress: () =>
                                                                    console.log(
                                                                        "Cancel Pressed"
                                                                    ),
                                                                style: "cancel",
                                                            },
                                                            {
                                                                text: "Sim",
                                                                onPress: () =>
                                                                    deteleServico(
                                                                        item.id
                                                                    ),
                                                            },
                                                        ],
                                                        { cancelable: false }
                                                    )
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    texto: {
        color: "#fff",
        fontSize: 20,
    },
    servicoContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    listServico: {
        width: 350,
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        justifyContent: "center",
    },
    reloadBotton: {
        margin: 10,
        width: 300,
        height: 30,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    textServico: {
        fontSize: 15,
    },
    ViewIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
