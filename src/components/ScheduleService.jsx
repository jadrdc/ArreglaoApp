import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Input, Button, Text, ButtonGroup, CheckBox, Card, Avatar } from 'react-native-elements';
import { scheduleService, loadUser } from '../services/UserServices'
import { Agenda } from 'react-native-calendars';
import TimePicker from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ScheduleService(props) {
    const { services } = props.params
    const [items, setItems] = useState({});
    const [selectedHours, setSelectedHours] = useState(0);
    const [selectedMinutes, setSelectedMinutes] = useState(0);
    const [isShownDate, setIsShownDate] = useState(false)
    const [selectedDate, setDate] = useState(new Date())
    const [email, setEmail] = useState()

    useEffect(() => {
        loadUser().then((result => {
            const data = result != null ? JSON.parse(result) : null
            setEmail(data.email)

        })).catch((err) => {
        })
    }, [])


    const showMessage = (title, text) => {
        Alert.alert(title, text,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }



    const createService = () => {
        const reservation = {}
        reservation.date = selectedDate
        reservation.hours = selectedHours
        reservation.minutes = selectedMinutes
        reservation.services = services.name
        reservation.dop = services.dop
        reservation.isComfirmed = "Sin Confirmar"
        reservation.usd = services.usd
        reservation.email = email
        scheduleService(reservation).then(() => {
            showMessage("Informacion", "Se ha creado exitosamente la reserva")

        }).catch((err => {
            showMessage("ERROR", err.message)
        }))

    }

    const schedule = () => {
        setIsShownDate(true)
    }
    return (<View>
        <Image source={require("../../assets/luna.png")}
            style={styles.logo} />
        <Card containerStyle={styles.cardStyle} >
            <Card.Title style={styles.cardTitle}>{services.name}</Card.Title>
            <Card.Divider />
            <Text style={styles.textFooter}>Precios</Text>
            <Text>{services.dop} DOP</Text>
            <Text>{services.usd} USD</Text>
        </Card>


        <Button title="Seleccionar Fecha"
            onPress={schedule}
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnLogin} />

        {(isShownDate) && (<DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            is24Hour={true}
            mode={false}
            on
            onChange={(event, date) => {
                setDate(date)
                setIsShownDate(false)
            }}
            display="default"
        />)}

        <Text style={styles.textFooter}>    Seleccionar Hora</Text>
        <TimePicker
            selectedHours={selectedHours}
            //initial Hourse value
            selectedMinutes={selectedMinutes}
            //initial Minutes value
            onChange={(hours, minutes) => {
                setSelectedHours(hours);
                setSelectedMinutes(minutes);
            }}
        />
        <View style={styles.btnViewContainer}>
            <Button title="Agendar Cita"
                onPress={createService}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnLogin} />
        </View>
    </View>)

}

const styles = StyleSheet.create({
    logo: {
        width: 390,
        height: 150, margin: 8
    },
    inputStyle: {
        padding: 8,
        color: "#008ba3"
    },
    txtprice:
    {
        marginRight: 8, fontWeight: "bold", color: "black", marginBottom: 8

    },
    btnViewContainer: { flexDirection: "row" },
    timePIcker: { alignContent: "center", justifyContent: "center" },
    btnLogin: {
        backgroundColor: "#ff8c00"
    }, btnContainer: {
        width: "50%",
        margin: 8,
        alignSelf: 'flex-start',

    },
    btnContainerEnd: {
        width: "40%",
        margin: 8,
        alignSelf: 'flex-end',

    },
    root:
    {
        flexDirection: "column",
        flex: 1, margin: 8
    },
    container: {
        marginRight: 16,
        flexDirection: "row",
        backgroundColor: '#fff',
        alignItems: 'center'
    }, cardStyle: {
        marginTop: 8
    },
    textFooter:
    {
        marginTop: 8,
        color: "#008ba3",
        fontWeight: "bold",
        fontSize: 16
    }, cardTitle: {
        alignSelf: "flex-start"
        ,
        color: "#008ba3",
        fontSize: 18
    },
    viewRow:
    {
        margin: 8, flex: 1, flexDirection: "row"
    }
});

