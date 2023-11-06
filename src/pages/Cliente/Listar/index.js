import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Clientes";
    const [isLoading, setIsLoading] = useState(true);
    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            setClientes(json);
        } 
        catch (error) {
            console.error("Erro:", error);
        } 
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    const deleteCliente = async (id) => {
        try {
            await fetch(`${URL}/${id}`, {
                method: "DELETE",
            });
        } 
        catch (error) {
            console.error("Erro:", error);
        } 
        finally {
            getClientes();
        }
    };

    return (
        <View style={styles.profissionalContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color="black" />
            ) : (
                <View style={styles.profissionalContainerInterno}>
                    <View>
                        <TouchableOpacity onPress={() => getClientes()} style={styles.reloadButton}>
                            <Text style={{ color: 'white' }}>Atualizar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={clientes}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.listaProfissional}>
                                <View style={styles.icon}>
                                    
                                    <View>
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
                                                props.navigation.navigate(
                                                    "EditarCliente",
                                                    {
                                                        id: item.id,
                                                        nome: item.nome,
                                                        telefone: item.telefone,
                                                        cpf: item.cpf,
                                                    }
                                                )
                                            }
                                        />

                                        <Ionicons
                                            name="trash-outline"
                                            size={25}
                                            color={"red"}
                                            onPress={() => deleteCliente(item.id)}
                                        />
                                    </View>

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
    profissionalContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    
    profissionalContainerInterno: {
        justifyContent: "center",
        alignItems: "center"
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
    
    icon: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});