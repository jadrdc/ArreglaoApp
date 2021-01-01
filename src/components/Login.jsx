import React, { useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Loading from './Loading'
import { loginUser ,saveUser} from '../services/UserServices'
import firebaseApp from '../utils/firebase'
import * as firebase from 'firebase'


export default function LoginForm(props) {
    const [user, setUser] = useState({})
    const [errorEmail, setErrorEmail] = useState()
    const [errorPassword, setErrorPassword] = useState()
    const [isLoading, setIsloading] = useState(false)

    const signUp = () => {
        props.navigation.navigate('Register')
    }
    const showMessage = (title, text) => {
        Alert.alert(title, text,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }






    const login = async () => {

        var isValid = true;
        setIsloading(true)

        if (!user.password) {
            setErrorPassword("No se puede dejar este campo vacio")
            isValid = false
        }
        if (!user.email) {
            setErrorEmail("No se puede dejar este campo vacio")
            isValid = false
        }

        if (isValid) {
            await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((signUpUser) => {

                    loginUser(user.email).then((response) => {
                        setIsloading(false)
                        const userLog=response.data()

                        saveUser(userLog).then(()=>{  
                            props.navigation.replace('Home',{
                                isProfesional:userLog.isProfesional
                            })
                        }).catch((err) => {
                            setIsloading(false)
                            showMessage("Error", err.message)
                        })

                     

                    }).catch((err) => {
                        setIsloading(false)

                    })
                }).catch((err) => {
                    setIsloading(false)
                    showMessage("Error", err.message)
                })
        } else {
            setIsloading(false)
        }
    }



    return (
        <KeyboardAwareScrollView>
            <View style={styles.formContainer}>
                <Image source={require("../../assets/logofinal.png")}
                    resizeMode="contain"
                    style={styles.logo} />
                <Loading isVisible={isLoading} text="Iniciando sesión" />

                <Input placeholder="Email"
                    containerStyle={styles.InputForm}
                    inputStyle={styles.inputStyle}
                    errorStyle={{ color: '#ff8c00' }}
                    errorMessage={errorEmail}
                    onChange={e => {
                        user.email = e.nativeEvent.text;
                        setErrorEmail(null)
                    }}
                    leftIcon={<Icon type="material-community"
                        name="envelope-o"
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


                <Button title="Iniciar Sesión"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btnLogin}
                    onPress={login} />

                <Text onPress={signUp} h5 style={styles.TextButtonStyle}>No tienes cuenta con nosotros?  Registrate </Text>

            </View>
        </KeyboardAwareScrollView>);

}
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    }, logo: {
        width: "100%",
        marginTop: 40,
        height: 150
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
        color: "green"
    }, iconRight: {
        color: "#c1c1c1"
    },
    btnLogin: {
        backgroundColor: "#ff8c00"
    }, btnContainer: {
        width: "95%"
    },

    inputStyle: {
        padding: 8,
        color: "#008ba3"
    },
    TextStyle: {
        paddingLeft: 8,
        paddingRight: 8,
        fontWeight: "bold",
        paddingBottom: 16,
        alignSelf: 'flex-end',
        color: "#008ba3"
    }, TextButtonStyle: {
        marginTop: 28,
        fontWeight: "bold",
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 16,
        color: "#008ba3"
    }
});

