import React from 'react';
import { View, Image, ScrollView, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function RegisterForm() {
    return (<KeyboardAwareScrollView>
        <View style={styles.formContainer}>
        <Text   h3 style={styles.textLabel}>Unete a nosotros</Text>

            <Input placeholder="Nombre"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="user"
                    size={18}
                    iconStyle={styles.iconRight} />} />

            <Input placeholder="Email"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="at"
                    size={18}
                    iconStyle={styles.iconRight} />} />

            <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                is24Hour={true}
                display="default"
            />
            <Input placeholder="DD/MM/YYYY"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="calendar"
                    size={18}
                    iconStyle={styles.iconRight} />} 
                    />
            <Input placeholder="Número teléfonico"
                keyboardType="numeric"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="phone"
                    size={18}
                    iconStyle={styles.iconRight} />} />
            <Input placeholder="Nacionalidad"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="globe"
                    size={18}
                    iconStyle={styles.iconRight} />} />
            <Input placeholder="Dirección"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="map"
                    size={18}
                    iconStyle={styles.iconRight} />} />

            <View style={styles.btnViewContainer}>
                <Button title="Crear Cuenta"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnLogin} />

                <Button title="Cancelar"
                    containerStyle={styles.btnContainerEnd}
                    buttonStyle={styles.btnLogin} />

            </View>
        </View>
    </KeyboardAwareScrollView>)
}

const styles = StyleSheet.create({


    btnViewContainer: { flexDirection: "row" },
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 80
    }, logo: {
        width: "100%",
        marginTop: 40,
        height: 150
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    }, iconRight: {
        color: "#c1c1c1"
    },
    btnLogin: {
        backgroundColor: "#ff8c00"
    }, btnContainer: {
        width: "50%",
        margin: 8,
        alignSelf: 'flex-start',

    },
    btnContainerEnd: {
        width: "50%",
        margin: 8,
        alignSelf: 'flex-end',

    },


    inputStyle: {
        padding: 8,
        color: "#008ba3"
    },
    TextStyle: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16,
        alignSelf: 'flex-end',
        color: "#008ba3"
    }, TextButtonStyle: {
        marginTop: 28,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16,
        color: "#008ba3"
    },textLabel:{alignSelf:"flex-start" , marginBottom:12,        color: "#ff8c00"
}
});

