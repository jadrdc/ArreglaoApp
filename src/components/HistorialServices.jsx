import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { log, set } from 'react-native-reanimated';
import { findSchedulesByUser, loadUser } from '../services/UserServices'
import { useFocusEffect } from '@react-navigation/native';

export default function HistorialServices(props) {
    const [historic, setHistoric] = useState()
    const [isVisible, setIsvisible] = useState(false)


    useFocusEffect(
        React.useCallback(() => {
            loadUser().then((result => {
                const data = result != null ? JSON.parse(result) : null
                if (data.isProfesional == false) {
                    findSchedulesByUser(data.email, setHistoric).then((response => {
                    })).catch((err) => {

                    })
                }
                else {
                    setIsvisible(true)
                }
            })).catch((err) => {
            });
        }, [])
    );




    return (<View style={styles.root}>
        <Text style={styles.textFooter}>Historico de Servicios</Text>
        { isVisible && (<Text style={styles.textFooter} Visible={isVisible}>No tienes servicios a mostrar porque eres Admin</Text>
        )
        }
        <FlatList data={historic}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
                <Card containerStyle={styles.cardStyle} >
                    <Card.Title style={styles.cardTitle}>{item.services}</Card.Title>
                    <Card.Divider />
                    <Text style={styles.viewRow}>Estado : {item.isComfirmed}</Text>
                    <Text>Precio</Text>
                    <View style={styles.viewRow}>
                        <Text style={styles.txtprice} >{item.dop} DOP</Text>
                        <Text style={styles.txtprice}>{item.usd} USD</Text>
                    </View>
                    <Text>Fecha</Text>
                    <Text style={styles.viewRowText}>{new Date(item.date.seconds * 1000).toDateString()} {item.hours}:{item.minutes}</Text>

                </Card>}
        />
    </View>)

}


const styles = StyleSheet.create({


    cardTitle: {
        alignSelf: "flex-start"
        ,
        color: "#008ba3",
        fontSize: 18
    },
    viewRowText:
    {
        marginTop: 8, flex: 1, flexDirection: "row", fontWeight: "bold"
    }, viewRow:
    {
        marginTop: 8, flex: 1, flexDirection: "row"
    },
    txtprice:
    {
        marginRight: 8, fontWeight: "bold", color: "black", marginBottom: 8

    },
    txttime:
    {
        marginRight: 8, fontWeight: "bold", color: "black", marginTop: 8

    }
    ,





    icon: {
        width: "55%",
        height: 100
    }, logo: {
        width: "55%",
        marginTop: 20,
        marginLeft: 20,
        height: 150
    }, header: {
        marginTop: 20,
        width: "100%",
        color: "#008ba3"
    },
    root:
    {
        flexDirection: "column",
        flex: 1

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
        margin: 24,
        textAlign: "center",
        color: "#008ba3",
        fontWeight: "bold",
        fontSize: 20
    }
});

