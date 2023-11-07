import { TextInput, View, StyleSheet, } from "react-native"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

export default (pros) => {
    const URL = "https://agendamento-api-dev-btxz.3.us-1.fl0.io/api/Agendamentos"
    const [data, setData] = useState('')

    const attData = (text) => {
        setData(text)
    }

    function limpar() {
        setData('')
    }

    function enviar() {
        if (data == "") {
            alert("Checar se alguma informação está nula")
        } else {
            const agendamento = {
                data: data,
            };
            cadastraAgendamento(agendamento)
        }

    }

    const cadastraAgendamento = async (agendamento) => {
        try {
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendamento),
            })
        } catch (error) {
            console.error(
                "🚀 ~ file: index.js:46 ~ postAgendamento ~ console.log(error):",
            );
        } finally {
            limpar()
        }
    }

    return (
        <View >
            <View style={styles.containerInterno}>
                <TextInput style={styles.inputStyle}
                    placeholder='Data'
                    value={data}
                    onChangeText={attData}
                    placeholderTextColor={"#fff"}>
                </TextInput>
            </View>

            <View style={styles.viewIcon}>
                <View>
                    <Ionicons
                        name="trash-outline"
                        size={25}
                        color={"red"}
                        onPress={() => limpar()}
                    />
                </View>
                <View>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={25}
                        color={"green"}
                        onPress={() => enviar()}
                    />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    inputStyle: {
        margin: 10,
        padding: 10,
        width: 350,
        height: 40,
        color: "#fff",
        backgroundColor: "#6E6E6E",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    containerInterno: {
        justifyContent: "center",
        alignItems: "center",
        margin: 50
    },
    botao: {
        width: 230,
        height: 50,
        borderWidth: 2,
        borderRadius: 25,
        borderColor: "#000",
        marginTop: 50

    },
    viewIcon: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    }
})
