import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import SelectDropdown from "react-native-select-dropdown"
import { Ionicons } from "@expo/vector-icons"

export default ({ route }) => {
    const { id, data, servicoNome, clienteNome, clienteId, servicoId ,statusNome, statusId, navigator } = route.params
    const [dataAgendamento, setDataAgendamento] = useState(data)
    const [status, setStatus] = useState([])
    const [idStatus, setIdStatus] = useState(statusId)
    const [servico, setServico] = useState([])
    const [idServico, setServicoId] = useState(servicoId)
    const [cliente, setCliente] = useState([])
    const [idCliente, setClienteId] = useState(clienteId)
    let responsePut

    const getStatus = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Status"
            )
            const json = await response.json()
            setStatus(json)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:26 ~ getStatus ~ console.log(error):",
            );
        }
    }

    json = JSON.stringify({
        data: dataAgendamento,
        clienteId: Number(idCliente),
        servicoId: Number(idServico),
        statusId: Number(idStatus),
    })

    const editarStatus = async () => {
        try {
            responsePut = await fetch(
                `https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: json,
                }
            );
            console.log(responsePut.body)
            console.log(responsePut.status)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:54 ~ editAgendamento ~ console.log(error):"
            )
        } finally {
            if (responsePut.status === 400) {
                alert("Erro ao editar agendamento.")
                return
            } 
            alert("Status editado com sucesso!")
            navigator.navigate("ListarAgendamento")
        }
    }

    function validateStatusId(nomeStatus) {
        status.map((item) => {
            if (item.nome === nomeStatus) {
                setIdStatus(item.id)
            }
        });
    }

    useEffect(() => {
        getStatus()
    })

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titulo}>Informações detalhadas</Text>
                <View style={styles.input}>
                    <Text style={styles.textStyle}>Data: {data}</Text>
                    <Text style={styles.textStyle}>Serviço: {servicoNome}</Text>
                    <Text style={styles.textStyle}>Cliente: {clienteNome}</Text>
                </View>
                <Text style={styles.titulo}>Editar Status</Text>
                <SelectDropdown
                    data={status.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateStatusId(selectedItem)
                    }}
                    defaultButtonText={statusNome}
                    searchPlaceHolder={"Pesquisar status"}
                    buttonStyle={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 350,
                        height: 40,
                        margin: 10,
                        borderRadius: 5,
                        backgroundColor: "#6E6E6E",
                    }}
                    buttonTextStyle={{color: "#FFF"}}
                    search={true}
                />
            </View>
            <View style={styles.viewButton}>
                <Ionicons
                    name="checkmark-circle-outline"
                    size={50}
                    color={"green"}
                    onPress={() => editarStatus()}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    containerInfo: {
        alignItems: "center",
    },
    textStyle: {
        color: "#fff",
        fontSize: 20,
    },
    titulo: {
        fontSize: 25
    },
    input: {
        margin: 10,
        padding: 10,
        width: 350,
        height: 150,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        textAlign:'center',
    },
    viewButton: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
})
