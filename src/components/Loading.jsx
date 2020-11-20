import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements'

export default function Loading(props) {
    const { isVisible, text } = props;

    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgb(0,0,0,.5)"
            overlayStyle={styles.overlay}>
            <View style={styles.view}>
                <ActivityIndicator size="large" color="#ff8c00" />
                <Text style={styles.text}>{text}</Text>
            </View>
        </Overlay>);

}
const styles = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#ff8c00",
        borderWidth: 2,
        borderRadius: 10
    },
    view: { 
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    text: {
        color: "#ff8c00",
        marginTop: 10
    }
});