import { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
    SafeAreaView,
    StyleSheet,
} from "react-native";
export default (pros) => {
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [faturamento, setFaturamento] = useState([]);
    const [total, setTotal] = useState(0);
    const day = "01";

    const regex =
        "(((0[1-9])|([12][0-9])|(3[01]))-((0[0-9])|(1[012]))-((20[012]d|19dd)|(1d|2[0123])))";
    const patern = new RegExp(regex);

    async function buscarFaturamento() {
        if (mes === "" || ano === "") {
            alert("Por favor, preencha todos os campos.");
        } else {
            if (isDateValid(`${day}-${mes}-${ano}`)) {
                try {
                    const response = await fetch(
                        `https://agendamento-api-dev-btxz.3.us-1.fl0.io/faturamento/${mes}-${ano}`
                    );
                    const json = await response.json();
                    setFaturamento(json);
                } catch (error) {
                    console.error("Erro:", error);
                    alert(
                        "Erro ao buscar o faturamento. Por favor, tente novamente."
                    );
                }
            } else {
                alert("Data inválida.");
            }
        }

        getTotal(faturamento);
    }

    function getTotal(faturamento) {
        let total = 0;
        faturamento.forEach((item) => {
            total += item.valor;
        });
        setTotal(total);
    }

    function isDateValid(date) {
        return patern.test(date);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerIput}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o Mês desejado"
                    onChangeText={(mes) => setMes(mes)}
                    value={mes}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Digite o Ano desejado"
                    onChangeText={(ano) => setAno(ano)}
                    value={ano}
                    keyboardType="numeric"
                />
            </View>
            <View>
                <FlatList
                    style={styles.lista}
                    data={faturamento}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                borderBottomWidth: 2,
                                borderBottomColor: "#ccc",
                                padding: 15,
                            }}
                        >
                            <Text>
                                {item.servico} - {item.valor}R${" "}
                            </Text>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity onPress={buscarFaturamento} style={styles.button}>
                <Text>Buscar</Text>
            </TouchableOpacity>
            <View style={styles.total}>
                <Text style={{ color: "green" }}>Total: {total}R$</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerIput: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "10px",
    },
    container: {
        flex: 1,
        padding: 20,
    },
    textInput: {
        height: 40,
        width: 150,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
    },
    total: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
        borderBlockStyle: "solid",
    },
    lista: {
        width: 350,
        padding: 20,
    },
});
