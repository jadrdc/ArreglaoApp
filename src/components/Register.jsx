import React, { useState } from 'react';
import { View, StyleSheet, Alert, Modal, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, ButtonGroup } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebaseApp from '../utils/firebase'
import Loading from './Loading'

import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase"
const db = firebase.firestore(firebaseApp);

export default function RegisterForm() {
    const sex = ["Masculino", "Femenino"]
    const academicGrade = ["Primaria", "Secundaria", "Universitario"]
    const [isShownDate, setisShownDate] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [user, setUser] = useState({})
    const [selectedSexIndex, setSex] = useState(0)
    const [selectedAcademicIndex, setAcademic] = useState(0)
    const [errorName, setErrorName] = useState()
    const [errorEmail, setErrorEmail] = useState()
    const [errorPhone, setErrorPhone] = useState()
    const [errorNationality, setErrorNationality] = useState()
    const [errorAddress, setErrorAddress] = useState()
    const [errorBirthdate, setErrorBirthdate] = useState()
    const [errorPassword, setErrorPassword] = useState()

    const dateToday = new Date()
    const [birthdate, setBirthdate] = useState(dateToday.getDate() + "/" + (dateToday.getMonth() + 1) + "/" + dateToday.getFullYear())


    const setSexInfo = (selectedSexIndex) => {
        user.sex = sex[selectedSexIndex]
        setSex(selectedSexIndex)
    }


    const setAcademicInfo = (selectedAcademicIndex) => {
        user.academic = academicGrade[selectedAcademicIndex]
        setAcademic(selectedAcademicIndex)
    }

    const showMessage = (title, text) => {
        Alert.alert(title, text,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }
    const signUpAccount = async () => {
        var isValid = true;
        setIsloading(true)

        if (!user.sex) {
            user.sex = sex[0]
        }
        if (!user.academic) {
            user.academic = academicGrade[0]
        }
        if (!user.name) {
            setErrorName("No se puede dejar este campo vacio")
            isValid = false
        }

        if (!user.email) {
            setErrorEmail("No se puede dejar este campo vacio")
            isValid = false
        }
        if (!user.password) {
            setErrorPassword("No se puede dejar este campo vacio")
            isValid = false
        }
        if (!user.phoneNumber) {
            setErrorPhone("No se puede dejar este campo vacio")
            isValid = false
        }

        if (!user.nationality) {
            setErrorNationality("No se puede dejar este campo vacio")
            isValid = false
        }
        if (!user.address) {
            setErrorAddress("No se puede dejar este campo vacio")
            isValid = false
        }
        if (!birthdate) {
            setErrorBirthdate("No se puede dejar este campo vacio")
            isValid = false
        }

        if (isValid) {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(response => {
                    db.collection("users").add({ user })
                        .then(() => {
                            setIsloading(false)
                            showMessage("Informacion", "Usuario Creado exitosamente")
                        }).catch(() => {
                            setIsloading(false)
                            showMessage("Error", "Error creando usuario")
                        })
                }).catch(err => {
                    setIsloading(false)
                    showMessage("Error creando una cuenta", err.message)
                })
        }else{
            setIsloading(false)
        }
    }


    return (<KeyboardAwareScrollView>
        <View style={styles.formContainer}>
            <Text h3 style={styles.textLabel}>Unete a nosotros</Text>
            <Loading isVisible={isLoading} text="Registrando usuario" />
            <Input placeholder="Nombre"
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                errorStyle={{ color: '#ff8c00' }}
                errorMessage={errorName}
                onChange={(e) => {
                    user.name = e.nativeEvent.text;
                    setErrorName(null)
                }}
                leftIcon={<Icon type="material-community"
                    name="user"
                    size={18}
                    iconStyle={styles.iconRight} />} />

            <Input placeholder="Email"
                errorMessage={errorEmail}
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                errorStyle={{ color: '#ff8c00' }}
                onChange={(e) => {
                    user.email = e.nativeEvent.text;
                    setErrorEmail(null)
                }}
                leftIcon={<Icon type="material-community"
                    name="at"
                    size={18}
                    iconStyle={styles.iconRight} />} />

            <Input placeholder="Password"
                containerStyle={styles.InputForm}
                secureTextEntry={true}
                inputStyle={styles.inputStyle}
                errorStyle={{ color: '#ff8c00' }}
                errorMessage={errorPassword}
                onChange={e => {
                    user.password = e.nativeEvent.text;
                    setErrorPassword(null)
                }}
                leftIcon={<Icon type="material-community"
                    name="lock"
                    size={18}
                    iconStyle={styles.iconRight} />}
            />
            <ButtonGroup
                onPress={setSexInfo}
                containerStyle={styles.sexRadio}
                selectedIndex={selectedSexIndex}
                buttons={sex} />


            {(isShownDate) && (<DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                is24Hour={true}
                mode={false}
                on
                onChange={(event, date) => {
                    setBirthdate(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear())
                    setisShownDate(false)
                }}
                display="default"
            />)}

            <Input
                placeholder="Eliga su fecha de nacimiento"
                containerStyle={styles.InputForm}
                value={birthdate}
                onFocus={(e) => {
                    setErrorBirthdate(null)
                    if (isShownDate == false) {
                        setisShownDate(true)
                    }
                }}

                errorStyle={{ color: '#ff8c00' }}
                errorMessage={errorBirthdate}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="calendar"
                    size={18}
                    iconStyle={styles.iconRight} />}
            />

            <Input placeholder="Número teléfonico"
                keyboardType="numeric"
                errorMessage={errorPhone}
                errorStyle={{ color: '#ff8c00' }}
                onChange={(e) => {
                    user.phoneNumber = e.nativeEvent.text;
                    setErrorPhone(null)
                }}
                containerStyle={styles.InputForm}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="phone"
                    size={18}
                    iconStyle={styles.iconRight} />} />


            <Input placeholder="Nacionalidad"
                errorStyle={{ color: '#ff8c00' }}
                errorMessage={errorNationality}
                containerStyle={styles.InputForm}
                onChange={(e) => {
                    user.nationality = e.nativeEvent.text;
                    setErrorNationality(null)
                }}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="globe"
                    size={18}
                    iconStyle={styles.iconRight} />} />

            <Input placeholder="Dirección"
                errorStyle={{ color: '#ff8c00' }}
                errorMessage={errorAddress}
                containerStyle={styles.InputForm}
                onChange={(e) => {
                    user.address = e.nativeEvent.text;
                    setErrorAddress(null)
                }}
                inputStyle={styles.inputStyle}
                leftIcon={<Icon type="material-community"
                    name="map"
                    size={18}
                    iconStyle={styles.iconRight} />} />
            <ButtonGroup
                onPress={setAcademicInfo}
                selectedIndex={selectedAcademicIndex}
                textStyle={{ textAlign: "center" }}
                containerStyle={styles.sexRadio}
                buttons={academicGrade} />

            <View style={styles.btnViewContainer}>
                <Button title="Crear Cuenta"
                    onPress={signUpAccount}
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


    btnViewContainer: { flexDirection: "row", marginTop: 16, marginBottom: 16 },
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
    }, textLabel: {
        alignSelf: "flex-start", marginBottom: 8, color: "#ff8c00"
    }, sexRadio:
    {
        margin: 32,
        height: 35

    }, academicGrade:
    {
        width: 10,
        height: 35

    }
});

