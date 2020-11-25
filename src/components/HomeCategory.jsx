import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import { getServices } from '../services/UserServices'

export default function HomeCategory(props) {

    const [menu, setMenu] = useState([])

    useEffect(() => {
        getServices(setMenu)
    }, [])

    const goServiceListOffer=()=>
    {
        props.navigation.navigate('Lista de Servicios')
    }


    return (<View style={styles.root}>
        <View>
            <Image source={require("../../assets/logofinal.png")}
                resizeMode="contain"
                style={styles.logo} />
        </View>
        <FlatList data={menu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                 onPress={goServiceListOffer}>
                    <Card containerStyle={styles.cardStyle} >
                        <View style={styles.container}>
                            <Image source={{ uri: item.url }}
                                resizeMode="contain"
                                style={styles.icon} />
                            <Text containerStyle={styles.textContainer}
                                style={styles.textFooter}>{item.name}</Text>
                        </View>
                    </Card>
                </TouchableOpacity>}
        />
    </View>)

}

const styles = StyleSheet.create({
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

