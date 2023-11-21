import { TextInput, View, StyleSheet, Text, Alert, } from "react-native"
import { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import SelectDropdown from "react-native-select-dropdown"

export default (props) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos"
    const [data, setData] = useState('')
    const [servico, setServico] = useState([])
    const [servicoId, setServicoId] = useState('')
    const [cliente, setCliente] = useState([])
    const [clienteId, setClienteId] = useState('')
    const statusPendente = 1
    let responsePost

    const getServico = async () => {
        try {
            const response = await fetch(
                "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Servicos"
            )
            const json = await response.json()
            setServico(json)
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:25 ~ getServico ~ console.log(error):",
            )
        }
    }
    
    const getCliente = async () => {
        try {
            const response = await fetch("https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Clientes")
            const json = await response.json()
            setCliente(json)
        } 
        catch (error) {
            console.error(
                "🚀 ~ file: index.js:38 ~ getCliente ~ console.log(error):",
            )
        }
    }

    json = JSON.stringify({
        data: data,
        clienteId: Number(clienteId),
        servicoId: Number(servicoId),
        statusId: Number(statusPendente),
    })

    const cadastraAgendamento = async () => {
        if (data === "" || clienteId === "" || servicoId === "") {
            alert("Por favor, preencha todos os campos.")
        } else {
            if (!patern.test(data)) {
                alert("Por favor, preencha a data no padrão dd-mm-aaaa hh:mm")
                return
            }
            try {
                responsePost = await fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json,
                })
            } catch (error) {
                console.error(
                    "🚀 ~ file: index.js:68 ~ postAgendamento ~ console.log(error):",
                )
            } finally {
                if (responsePost.status === 400) {
                    alert("Erro ao cadastrar agendamento.")
                    return
                } 
                alert("Agendamento cadastrado com sucesso!")
                props.navigation.navigate("ListarAgendamento")
            }
        }
    }    

    function limpar() {
        setData('')
    }

    const regex = `^(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](202[0-9])[ ](0[0-9]|1[0-9]|2[0123])[:](0[0-9]|[12345][0-9])`

    const patern = new RegExp(regex)
    
    function validateServicoId(nomeServico) {
        servico.map((item) => {
            if (nomeServico.includes(item.nome)) {
                setServicoId(item.id)
            }
        });
    }

    function validateClienteId(nomeCliente) {
        cliente.map((item) => {
            if (item.nome === nomeCliente) {
                setClienteId(item.id)
            }
        });
    }

    useEffect(() => {
        getCliente()
        getServico()
    }, [])

    return (
        <>
            <View style={styles.container}>
                <TextInput style={styles.input}
                    placeholder='Data/Hora'
                    value={data}
                    onChangeText={setData}
                    placeholderTextColor={"#fff"}>
                </TextInput>
                <Text>Padrão para data: dd-mm-aaaa hh:mm</Text>
                <SelectDropdown
                    data={cliente.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateClienteId(selectedItem)
                    }}
                    defaultButtonText={"Selecione um cliente"}
                    searchPlaceHolder={"Pesquisar cliente"}
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
                <SelectDropdown
                    data={servico.map((item) => item.nome + " - R$" + item.valor)}
                    onSelect={(selectedItem, index) => {
                        validateServicoId(selectedItem)
                    }}
                    defaultButtonText={"Selecione um serviço"}
                    searchPlaceHolder={"Pesquisar serviço"}
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
                        name="trash-outline"
                        size={25}
                        color={"red"}
                        onPress={() => limpar()}
                    />
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={25}
                        color={"green"}
                        onPress={() => cadastraAgendamento()}
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
    input: {
        margin: 10,
        padding: 10,
        width: 350,
        height: 40,
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        textAlign:'center',
        color: "#FFF",
        fontSize: 17,
    },
    viewButton: {
        flex: 1,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
})
