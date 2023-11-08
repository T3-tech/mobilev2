import { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default (pros) => {
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [faturamento, setFaturamento] = useState([]);
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
        return total;
    }

    function isDateValid(date) {
        return patern.test(date);
    }

    return (
        <SafeAreaView>
            <Text>Faturamento</Text>
            <TextInput
                placeholder="Digite o Mês desejado"
                onChangeText={(mes) => setMes(mes)}
                value={mes}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Digite o Ano desejado"
                onChangeText={(ano) => setAno(ano)}
                value={ano}
                keyboardType="numeric"
            />

            <TouchableOpacity onPress={buscarFaturamento}>
                <Text>Buscar</Text>
            </TouchableOpacity>

            <View>
                <FlatList
                    data={faturamento}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>
                                {item.servico} - {item.valor}R${" "}
                            </Text>
                        </View>
                    )}
                />
            </View>

            <View>
                <Text>Total: {getTotal(faturamento)}R$</Text>
            </View>
        </SafeAreaView>
    );
};
