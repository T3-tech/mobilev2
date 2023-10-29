import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    FlatList,
    View,
    Button
} from "react-native";

export default (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [agendamento, setAgendamento] = useState([]);


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
            setIsLoading(false);
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
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => (
                            <Text>
                                {item.profissionalNome}
                                - {item.clienteNome}
                                - {item.servicoNome}
                                - {item.data}
                                - {item.statusNome}
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
