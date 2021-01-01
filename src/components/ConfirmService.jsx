import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, Button } from 'react-native'
import { Card } from 'react-native-elements'
import { log, set } from 'react-native-reanimated';
import { findAllSchedule, confirmOrder,loadUser } from '../services/UserServices'
import { useFocusEffect } from '@react-navigation/native';

export default function ConfirmServices(props) {
    const [historic, setHistoric] = useState()
    const [render, setRender] = useState(false)
    const [isVisible, setIsvisible] = useState(false)


    useFocusEffect(
        React.useCallback(() => {
            loadUser().then((result => {
                const data = result != null ? JSON.parse(result) : null
                if (data.isProfesional == true) {
                    findAllSchedule(setHistoric).then((result => {
                    })).catch((err) => {
                    });
                }
                else {
                    setIsvisible(true)
                }
            })).catch((err) => {
            });
        }, [])
    );
 


   /* useFocusEffect(
        React.useCallback(() => {
            findAllSchedule(setHistoric).then((result => {
                const data = result != null ? JSON.parse(result) : null
            })).catch((err) => {
            });
        }, [])
    );*/

    const confirm = async (item) => {
        item.isComfirmed = "Confirmado";
        confirmOrder(item).then(() => {
        setRender(true)
        setRender(false)
        }).catch((err) => {

        })
    }


    return (<View style={styles.root}>
        <Text style={styles.textFooter}>Ordenes a Confirmar</Text>
        { isVisible && (<Text style={styles.textFooter} Visible={isVisible}>No tienes permiso para Confirmar servicios</Text>
        )
        }
        <FlatList data={historic}
        extraData={render}
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

                    {(item.isComfirmed == "Sin Confirmar") && (
                        <Button title="Confirmar"
                            onPress={() => confirm(item) }
                            containerStyle={styles.btnContainer}
                            buttonStyle={styles.btnLogin} />
                    )}
                </Card>}
        />






    </View>)

}


const styles = StyleSheet.create({
    btnViewContainer: { flexDirection: "row", marginTop: 16, marginBottom: 16, flex: 1 },
    btnContainer: {
        width: "50%",
        margin: 16,
        alignSelf: 'flex-start',

    }, btnLogin: {
        backgroundColor: "#ff8c00"
    },

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

