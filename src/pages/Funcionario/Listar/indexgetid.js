import { Text, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default ({ route }) => {
    const { id } = route.params;
    const [profissional, setprofissional] = useState([]);

    const getProfissionalPorId = async () => {
        try {
            const response = await fetch(
                `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Profissionais/${id}`
            );
            const json = await response.json();
            setprofissional(json);


        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:32 ~ getAgendamento ~ console.log(error):"
            );
        }
    }
    useEffect(() => {
        getProfissionalPorId();
    }, []);
    return (
        <SafeAreaView>
            <Text>NOME: {profissional.nome}</Text>
            <Text>CPF: {profissional.cpf}</Text>
            <Text>TELEFONE: {profissional.telefone}</Text>
            <Text>SERVIÇOS PRESTADOS</Text>
            <FlatList data={profissional.listaServico}
                keyExtractor={({ idServico }) => idServico}
                renderItem={({ item }) => (
                    <Text>{item.nomeSevico}</Text>
                )}
            >

            </FlatList>
        </SafeAreaView >
    );
};
