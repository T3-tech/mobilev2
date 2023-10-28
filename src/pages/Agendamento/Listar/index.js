import { NavigationContainer } from "@react-navigation/native";
import { Button } from "@rneui/base";
import React, { useState } from "react";
import { useEffect } from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    View,
} from "react-native";

export default (props) => {
    const [agendamento, setAgendamento] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const url = "http://localhost:7096/api/Agendamentos";

    const getAgendamento = async () => {
        try {
            const response = await fetch(url);
            console.log(
                "🚀 ~ file: index.js:23 ~ getAgendamento ~ response",
                response
            );

            const json = await response.json();
            console.log("🚀 ~ file: index.js:28 ~ getAgendamento ~ json", json);
            setAgendamento(json);
        } catch (error) {
            console.log(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):",
                console.log(error)
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAgendamento();
    }, []);

    return (
        <>
            <View>
                {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                    <FlatList
                        data={agendamento}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <Text>
                                {item.profissionalNome}
                                {item.clienteNome}
                                {item.servicoNome}
                                {item.data}
                                {item.statusNome}
                            </Text>
                        )}
                    />
                )}
                <Button title={"Atualizar"} onPress={() => getAgendamento()} />
            </View>
        </>
    );
};

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
});
