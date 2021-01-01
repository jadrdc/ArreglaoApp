import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import { getServicesOffers } from '../services/UserServices'

export default function ServicesOfferList(props) {
    const [serviceOffers, setServicesOffers] = useState()

    useEffect(() => {
        const categoryId = props.params.categoryId
        getServicesOffers(categoryId, setServicesOffers)


    }, [])


    const goScheduleService=(service)=>
    {
        props.navigation.navigate("Agendar Servicios",{
            services: service          })
    }


    return (<View style={styles.root}>
        <FlatList data={serviceOffers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
                <TouchableOpacity                  onPress={ ()=>goScheduleService(item)}>
                    <Card containerStyle={styles.cardStyle} >
                        <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                        <Card.Divider />
                        <Text>Precio</Text>
                        <View style={styles.viewRow}>
                            <Text style={styles.txtprice} >{item.dop} DOP</Text>
                            <Text style={styles.txtprice}>{item.usd} USD</Text>
                        </View>
                        <Text>Duración</Text>
                        <Text style={styles.txttime}>{item.time}</Text>

                    </Card>
                </TouchableOpacity>}
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
    viewRow:
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
        textAlign: "center",
        color: "#008ba3",
        fontWeight: "bold",
        fontSize: 20
    }
});

