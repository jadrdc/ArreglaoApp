import React from 'react';
import { View, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button,Text } from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export default function LoginForm() {
    return (
<KeyboardAwareScrollView>
    <View style={styles.formContainer}>
         <Image source={require("../../assets/logofinal.png")}
                resizeMode="contain"
                style={styles.logo} />
        
        <Input placeholder="Email"
            containerStyle={styles.InputForm}  
            inputStyle={styles.inputStyle}  
            leftIcon={<Icon type="material-community"
                name="envelope-o"
                size={18}
                iconStyle={styles.iconRight} />} />


        <Input placeholder="Password"
            containerStyle={styles.InputForm}
            secureTextEntry={true}
            inputStyle={styles.inputStyle}  
            leftIcon={<Icon type="material-community"
                name="lock"
                size={18}
                iconStyle={styles.iconRight} />}
        />


        <Text   h5 style={styles.TextStyle}>Olvidaste tu contraseña?</Text>

        <Button title="Iniciar Sesión"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnLogin} />

    <Text   h5 style={styles.TextButtonStyle}>No tienes cuenta con nosotros?  Registrate </Text>

    </View>
    </KeyboardAwareScrollView>    );

}
const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },  logo: {
        width: "100%",
        marginTop: 40,
        height: 150
    },
    inputForm: {
        width: "100%",
        marginTop: 20, 
        color:"green"
    }, iconRight: {
        color: "#c1c1c1" 
    },
    btnLogin: {
        backgroundColor: "#ff8c00"
    }, btnContainer: {
        width: "95%"
    },

    inputStyle:{   
        padding:8,
        color: "#008ba3"
},
TextStyle:{   
    paddingLeft:8,    
    paddingRight:8,
     fontWeight:"bold",
    paddingBottom:16, 
    alignSelf: 'flex-end',
    color: "#008ba3"
},TextButtonStyle:{  
    marginTop:28, 
    fontWeight:"bold",
    paddingLeft:8,    
    paddingRight:8, 
    paddingBottom:16,   
    color: "#008ba3"
}
});

