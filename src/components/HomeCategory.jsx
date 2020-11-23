import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert, Switch,useEffect ,useState} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, ListItem } from 'react-native-elements';
import * as firebase from 'firebase'
import firebaseApp from '../utils/firebase'
const db = firebase.database()

export default function HomeCateogry(props) {

    const [menu,setMenu]=useState([])


    useEffect(()=>
    {
        async function getServices() {
            await db.ref('/servicios').once('value').then((snapshot) => {
                var list = snapshot.val()
                var keys = Object.keys(list)
                var services = []
                keys.forEach(element => {
                    var root = list[element]
                    if(root.id==2)
                    {root.isChecked=false
                    }
                    else{
                        root.isChecked=true
                    }services.push(root)
                  //  checkList.push(false)
                })
                setServices(services)
            });


        }
        getServices()
    

    },[])
   





    return (<View>
     
    </View>)

}

const styles = StyleSheet.create({
    textHeader:
    {
        color: "#008ba3",
        margin: 8,
        fontWeight: "bold"
    },
    textFooter:
    {
        margin: 8
    },
    footer: {
        flex: 1,
        flexDirection: "row"
    }

});

