import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import { getServices ,loadUser} from '../services/UserServices'

export default function HomeCategory(props) {

    const [menu, setMenu] = useState([])
    const [isVisible, setIsvisible] = useState(false)


    useEffect(() => {
    
        loadUser().then((result => {
            const data = result != null ? JSON.parse(result) : null
            if (data.isProfesional == false) {
               getServices(setMenu)
            }
            else {
                setIsvisible(true)
            }
        })).catch((err) => {
        });
    //    getServices(setMenu)
    
    
    
    }, [])

    const goServiceListOffer=(category)=>
    {
        props.navigation.navigate('Lista de Servicios',{
            categoryId: category   ,
            user:props.user       })
    }


    return (<View style={styles.root}>
        <View>
            <Image source={require("../../assets/logofinal.png")}
                resizeMode="contain"
                style={styles.logo} />
        </View>
        { isVisible && (<Text style={styles.textFooter} Visible={isVisible}>Estas en un perfil de freelancer,inicia sesion como cliente</Text>
        )
        }
        <FlatList data={menu}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
                <TouchableOpacity
                 onPress={ ()=>goServiceListOffer(item.id)}>
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

