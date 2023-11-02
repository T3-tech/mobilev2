import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default (props) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Clientes"; // URL dos Clientesss
    const [isLoading, setIsLoading] = useState(true);
    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            setClientes(json);
        } catch (error) {
            console.error("moiô óia o erro mané:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <View style={styles.clienteContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color="black" />
            ) : (
                <View style={styles.clienteContainerInterno}>
                    <TouchableOpacity onPress={() => getClientes()} style={styles.reloadButton}>
                        <Text style={styles.reloadButtonText}>Atualizar</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={clientes}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                        <View style={styles.listaCliente}>
                            <View style={styles.infoContainer}>
                                <Text style={styles.label}>Nome:</Text>
                                <Text style={styles.value}>{item.nome}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                                <Ionicons
                                name="create-outline"
                                size={25}
                                color={"blue"}
                                onPress={() =>
                                    pros.navigation.navigate("EditarCliente", {
                                        id: item.id,
                                        nome: item.nome,
                                        telefone: item.telefone,
                                        cpf: item.cpf,
                                    })
                                }
                                />
                                <Ionicons
                                    marginTop
                                    name="trash-outline"
                                    size={25}
                                    color={"red"}
                                    onPress={() => deteleCliente(item.id)}
                                />
                                </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.label}>Telefone:</Text>
                                        <Text style={styles.value}>{item.telefone}</Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.label}>CPF:</Text>
                                        <Text style={styles.value}>{item.cpf}</Text>
                                    </View>
                            </View>
                        )}
                    />
                    </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    clienteContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    
    clienteContainerInterno: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    
    reloadButton: {
        backgroundColor: "#6E6E6E",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    
    reloadButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    
    listaCliente: {
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        width: 500
    },
    
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
});