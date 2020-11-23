import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Alert, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, ListItem } from 'react-native-elements';

export default function ServiceList(props) {
    const { service } = props


    return (<View>
      <ListItem key={service.name} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{service.name}</ListItem.Title>
                <ListItem.Subtitle>{service.price}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
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

