import { TextInput, View, StyleSheet, } from "react-native"
import { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import SelectDropdown from "react-native-select-dropdown"

export default (pros) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos"
    const [data, setData] = useState('')
    const [servico, setServico] = useState([])
    const [servicoId, setServicoId] = useState('')
    const [cliente, setCliente] = useState([])
    const [clienteId, setClienteId] = useState('')
    const statusPendente = 1


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

    function limpar() {
        setData('')
        setCliente('')
        setServico('')
    }

    json = JSON.stringify({
        data: data,
        clienteId: clienteId,
        servicoId: servicoId,
        statusId: statusPendente,
    })

    const cadastraAgendamento = async () => {
        try {
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: json,
            })
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:67 ~ postAgendamento ~ console.log(error):",
            )
        } finally {
            limpar()
        }
    }
    
    function validateServicoId(nomeServico) {
        servico.map((item) => {
            if (item.nome === nomeServico) {
                setServicoId(item.id);
            }
        });
    }

    function validateClienteId(nomeCliente) {
        cliente.map((item) => {
            if (item.nome === nomeCliente) {
                setClienteId(item.id);
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
                    placeholder='Data'
                    value={data}
                    onChangeText={setData}
                    placeholderTextColor={"#fff"}>
                </TextInput>
                <SelectDropdown
                    data={cliente.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateClienteId(selectedItem)
                    }}
                    defaultButtonText={"Selecione um cliente"}
                    searchPlaceHolder={"Pesquisar cliente"}
                    key={cliente.map((item) => item.id)}
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
                    data={servico.map((item) => item.nome)}
                    onSelect={(selectedItem, index) => {
                        validateServicoId(selectedItem)
                    }}
                    defaultButtonText={"Selecione um serviço"}
                    searchPlaceHolder={"Pesquisar serviço"}
                    key={servico.map((item) => item.id)}
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
