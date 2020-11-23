import React, { useState } from 'react';
import { View, StyleSheet, Alert, Switch, FlatList, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, ButtonGroup, CheckBox, ThemeProvider } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebaseApp from '../utils/firebase'
import Loading from './Loading'
import * as firebase from 'firebase'
import { useEffect } from 'react';
const db = firebase.database()
import { filter } from 'lodash'
const sex = ["Masculino", "Femenino"]
const academicGrade = ["Primaria", "Secundaria", "Universitario"]
const dateToday = new Date();

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isShownDate: false,
            isLoading: false,
            user: {},
            selectedSex: 0,
            selectedAcademicIndex: 0,
            errorName: null,
            errorEmail: null, errorName: null
            , errorEmail: null
            , errorPhone: null
            , errorNationality: null
            , errorAddress: null
            , errorBirthdate: null
            , errorPassword: null
            , isProfesional: false,
            birthdate: dateToday.getDate() + "/" + (dateToday.getMonth() + 1) + "/" + dateToday.getFullYear(),
            serviceList: [],
            checkList: false
        }
    }

    async componentDidMount() {
        await db.ref('/servicios').once('value').then((snapshot) => {
            var list = snapshot.val()
            var keys = Object.keys(list)
            var services = []
            keys.forEach(element => {
                var root = list[element]
                if (root.id == 2) {
                    root.isChecked = false
                }
                else {
                    root.isChecked = true
                } services.push(root)
                //  checkList.push(false)
            })
            this.setState({ serviceList: services })
        })


    }
    handleChange = (index) => {
        this.state.serviceList[index].isChecked = !this.state.serviceList[index].isChecked
        this.setState({ checkList: true });


    }

    setSexInfo = (index) => {
        this.state.user.sex = sex[index]
        this.setState({ selectedSex: index });
    }


    setAcademicInfo = (index) => {
        this.state.user.academic = academicGrade[index]
        this.setState({ selectedAcademicIndex: index });
    }

    showMessage = (title, text) => {
        Alert.alert(title, text,
            [
                { text: "OK" }
            ],
            { cancelable: false }
        );
    }

    enableIsProfesionalForm = (value) => {
        this.setState({ isProfesional: value });
    }





    signUpAccount = async () => {
        var isValid = true;
        this.setState({ isLoading: true });

        if (!this.state.user.sex) {
            this.state.user.sex = sex[0]
        }
        if (!this.state.user.academic) {
            this.state.user.academic = academicGrade[0]
        }
        if (!this.state.user.name) {

            this.setState({ errorName: "No se puede dejar este campo vacio" });
            isValid = false
        }
        if (!this.state.user.isProfesional) {
            this.state.user.isProfesional = false
        }
        if (!this.state.user.email) {
            this.setState({ errorEmail: "No se puede dejar este campo vacio" });
            isValid = false
        }
        if (!this.state.user.password) {
            this.setState({ errorPassword: "No se puede dejar este campo vacio" });
            isValid = false
        }
        if (!this.state.user.phoneNumber) {
            this.setState({ errorPhone: "No se puede dejar este campo vacio" });
            isValid = false
        }

        if (!this.state.user.nationality) {
            this.setState({ errorNationality: "No se puede dejar este campo vacio" });
            isValid = false
        }
        if (!this.state.user.address) {
            this.setState({ errorAddress: "No se puede dejar este campo vacio" });
            isValid = false
        }
        if (!this.state.birthdate) {
            this.setState({ errorBirthdate: "No se puede dejar este campo vacio" });
            isValid = false
        }
        var services = []
        if (this.state.isProfesional) {
            services = filter(this.state.serviceList, (serviceSelected) => serviceSelected.isChecked)
        }



        if (isValid) {
            await firebase.auth().createUserWithEmailAndPassword(this.state.user.email,
                this.state.user.password)
                .then(response => {
                    db.ref('/users/' + this.state.user.email.replace(".", "")).push({
                        academic: this.state.user.academic,
                        address: this.state.user.address,
                        email: this.state.user.email,
                        isProfesional: this.state.user.isProfesional,
                        name: this.state.user.name,
                        nationality: this.state.user.nationality,
                        password: this.state.user.password,
                        phoneNumber: this.state.user.phoneNumber,
                        sex: this.state.user.sex,
                        service:services,
                        birthdate:this.state.birthdate
                    }
                    ).then(() => {
                        this.setState({ isLoading: false });
                        this.showMessage("Informacion", "Usuario Creado exitosamente")
                    }).catch(() => {
                        this.setState({ isLoading: false });
                        this.showMessage("Error", "Error creando usuario")
                    })
                }).catch(err => {
                    this.setState({ isLoading: false });
                    this.showMessage("Error creando una cuenta", err.message)
                })
        } else {
            this.setState({ isLoading: false });
        }
    }




    render() {
        return (<KeyboardAwareScrollView>
            <View style={styles.formContainer}>
                <Text h3 style={styles.textLabel}>Unete a nosotros</Text>
                <Loading isVisible={this.state.isLoading} text="Registrando usuario" />
                <Input placeholder="Nombre"
                    containerStyle={styles.InputForm}
                    inputStyle={styles.inputStyle}
                    errorStyle={{ color: '#ff8c00' }}
                    errorMessage={this.state.errorName}
                    onChange={(e) => {
                        this.state.user.name = e.nativeEvent.text;
                        this.setState({ errorName: null });
                    }}
                    leftIcon={<Icon type="material-community"
                        name="user"
                        size={18}
                        iconStyle={styles.iconRight} />} />

                <Input placeholder="Email"
                    errorMessage={this.state.errorEmail}
                    containerStyle={styles.InputForm}
                    inputStyle={styles.inputStyle}
                    errorStyle={{ color: '#ff8c00' }}
                    onChange={(e) => {
                        this.state.user.email = e.nativeEvent.text;
                        this.setState({ errorEmail: null });
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
                    errorMessage={this.state.errorPassword}
                    onChange={e => {
                        this.state.user.password = e.nativeEvent.text;
                        this.setState({ errorPassword: null });
                    }}
                    leftIcon={<Icon type="material-community"
                        name="lock"
                        size={18}
                        iconStyle={styles.iconRight} />}
                />
                <ButtonGroup
                    onPress={this.setSexInfo}
                    containerStyle={styles.sexRadio}
                    textStyle={{ textAlign: "center" }}
                    selectedIndex={this.state.selectedSex}
                    buttons={sex} />


                {(this.state.isShownDate) && (<DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    is24Hour={true}
                    mode={false}
                    on
                    onChange={(event, date) => {
                        this.setState({ birthdate: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() });
                        this.setState({ isShownDate: false });
                    }}
                    display="default"
                />)}

                <Input
                    placeholder="Eliga su fecha de nacimiento"
                    containerStyle={styles.InputForm}
                    value={this.state.birthdate}

                    errorStyle={{ color: '#ff8c00' }}
                    errorMessage={this.state.errorBirthdate}
                    inputStyle={styles.inputStyle}
                    leftIcon={<Icon type="material-community"
                        name="calendar"
                        size={18}
                        iconStyle={styles.iconRight}
                        onPress={() => {
                            this.setState({ errorBirthdate: null });
                            if (this.state.isShownDate == false) {
                                this.setState({ isShownDate: true });
                            }
                        }} />}
                />

                <Input placeholder="Número teléfonico"
                    keyboardType="numeric"
                    errorMessage={this.state.errorPhone}
                    errorStyle={{ color: '#ff8c00' }}
                    onChange={(e) => {
                        this.state.user.phoneNumber = e.nativeEvent.text;
                        this.setState({ errorPhone: null });
                    }}
                    containerStyle={styles.InputForm}
                    inputStyle={styles.inputStyle}
                    leftIcon={<Icon type="material-community"
                        name="phone"
                        size={18}
                        iconStyle={styles.iconRight} />} />


                <Input placeholder="Nacionalidad"
                    errorStyle={{ color: '#ff8c00' }}
                    errorMessage={this.state.errorNationality}
                    containerStyle={styles.InputForm}
                    onChange={(e) => {
                        this.state.user.nationality = e.nativeEvent.text;
                        this.setState({ errorNationality: null });
                    }}
                    inputStyle={styles.inputStyle}
                    leftIcon={<Icon type="material-community"
                        name="globe"
                        size={18}
                        iconStyle={styles.iconRight} />} />

                <Input placeholder="Dirección"
                    errorStyle={{ color: '#ff8c00' }}
                    errorMessage={this.state.errorAddress}
                    containerStyle={styles.InputForm}
                    onChange={(e) => {
                        this.state.user.address = e.nativeEvent.text;
                        this.setState({ errorAddress: null });
                    }}
                    inputStyle={styles.inputStyle}
                    leftIcon={<Icon type="material-community"
                        name="map"
                        size={18}
                        iconStyle={styles.iconRight} />} />


                <ButtonGroup
                    onPress={this.setAcademicInfo}
                    selectedIndex={this.state.selectedAcademicIndex}
                    textStyle={{ textAlign: "center" }}
                    containerStyle={styles.sexRadio}
                    buttons={academicGrade} />



                <View style={styles.switchContainer}>
                    <Text>Eres un freelancer?</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff8c00" }}
                        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={this.enableIsProfesionalForm}
                        value={this.state.isProfesional}
                    />
                </View>
                {(this.state.isProfesional) && (
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList data={this.state.serviceList}
                            extraData={this.state.checkList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <CheckBox
                                    containerStyle={styles.checkBoxStyle}
                                    title={item.name}
                                    onPress={() => this.handleChange(index)}
                                    checked={item.isChecked}
                                    checkedColor='#008ba3'
                                />
                            }
                        /></SafeAreaView>
                )}

                <View style={styles.btnViewContainer}>
                    <Button title="Crear Cuenta"
                        onPress={this.signUpAccount}
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btnLogin} />

                    <Button title="Cancelar"
                        containerStyle={styles.btnContainerEnd}
                        buttonStyle={styles.btnLogin} />
                </View>
            </View>
        </KeyboardAwareScrollView >)
    }
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
        alignSelf: "flex-start",
        marginBottom: 8,
        color: "#ff8c00"
    }, sexRadio:
    {
        margin: 32,
        height: 35

    }, academicGrade:
    {
        width: 10,
        height: 35

    },
    textIsProfesional:
    {
        marginTop: 8,
        alignSelf: "flex-start",
        marginLeft: 8,

    },
    switchContainer:
    {
        flex: 1,
        alignSelf: "flex-start",
        marginTop: 8,
        marginLeft: 8,
        flexDirection: "row",
        alignContent: "flex-start",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    }
    , checkBoxStyle:
    {
        alignSelf: "flex-start"
    }
});

