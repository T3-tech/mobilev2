import { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";

export default (props) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos"
    const [isLoading, setIsLoading] = useState(true)
    const [agendamento, setAgendamento] = useState([])
    const [statusFilter, setStatusFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")

    const getAgendamento = async () => {
        try {
            const response = await fetch(URL)
            const json = await response.json()
            setAgendamento(json)

        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):",
            );
        } finally {
            setIsLoading(false)
        }
    };

    const deteleAgendamento = async (id) => {
        try {
            await fetch(`${URL}/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:47 ~ deleteAgentamento ~ console.log(error):"
            );
        } finally {
            getAgendamento();
        }
    };

    useEffect(() => {
        getAgendamento()
    }, []);

    const filteredAgendamento = agendamento.filter((item) => {
        if (statusFilter && dateFilter) {
            return (
                item.statusNome.includes(statusFilter) &&
                item.data.includes(dateFilter)
            );
        } else if (statusFilter) {
            return item.statusNome.includes(statusFilter)
        } else if (dateFilter) {
            return item.data.includes(dateFilter)
        } else {
            return true
        }
    });

    return (
        <>
            <View style={styles.agendamentoContainer}>
                {isLoading ? (
                    <ActivityIndicator size={50} color={'black'} />
                ) : (

                    <View>
                        <View style={styles.filterContainer}>
                            <TextInput
                                style={styles.filterInput}
                                placeholder="Filtrar por status"
                                value={statusFilter}
                                onChangeText={(text) => setStatusFilter(text)}
                            />
                            <TextInput
                                style={styles.filterInput}
                                placeholder="Filtrar por data"
                                value={dateFilter}
                                onChangeText={(text) => setDateFilter(text)}
                            />
                        </View>
                        <View style={styles.reloadBotton}>
                            <TouchableOpacity onPress={() => getAgendamento()}>
                                <Text style={{ color: 'white' }}>Atualizar</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={filteredAgendamento}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <View style={styles.listAgendamento}>
                                    <Text style={{ textAlign: "center"}}>
                                        {item.statusNome}
                                    </Text>
                                    <Text>
                                        {item.servicoNome}
                                    </Text>
                                    <Text>
                                        {item.clienteNome} - {item.data}
                                    </Text>
                                    <View style={styles.ViewIcon}>
                                        <Text>
                                            Profissional:{" "}{item.profissionalNome}
                                        </Text>
                                        <View style={styles.ViewIcon}>
                                            <Ionicons
                                                name="create-outline"
                                                size={25}
                                                color={"blue"}
                                                onPress={() =>
                                                    props.navigation.navigate(
                                                        "EditarAgendamento",
                                                        {
                                                            id: item.id,
                                                            clienteId: item.clienteId,
                                                            servicoId: item.servicoId,
                                                            data: item.data,
                                                            clienteNome: item.clienteNome,
                                                            servicoNome: item.servicoNome,
                                                            statusId: item.statusId,
                                                            navigator: props.navigation,
                                                        }
                                                    )
                                                }
                                            />
                                            <Ionicons
                                                name="trash-outline"
                                                size={25}
                                                color={"red"}
                                                onPress={() =>
                                                    Alert.alert(
                                                        "Deletar Agendamento",
                                                        "Deseja deletar o agendamento?",
                                                        [
                                                            {
                                                                text: "Não",
                                                                onPress: () =>
                                                                    console.log("Cancel Pressed"),
                                                                style: "cancel",
                                                            },
                                                            {
                                                                text: "Sim",
                                                                onPress: () =>
                                                                    deteleAgendamento(item.id),
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
                    </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    texto: {
        color: "#fff",
        fontSize: 20,
    },
    agendamentoContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
    filterInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        flex: 1,
        marginRight: 3,
        marginLeft: 3,
        marginTop: 10,
    },
    listAgendamento: {
        padding: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
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
    ViewIcon: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})
