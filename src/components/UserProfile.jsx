import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { map } from 'lodash'

export default function UserProfile(props) {

    const { name, email, nationality, phoneNumber, address, sex, birthdate } = props.user
    const menuOptions = generateOptions()

    function generateOptions() {
        return [{
            title: name,
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ff8c00",
        }, {
            title:  email ,
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ff8c00"
        }, {
            title:  birthdate ,
            iconType: "material-community",
            iconNameLeft: "calendar",
            iconColorLeft: "#ff8c00"
        }, {
            title:  phoneNumber ,
            iconType: "material-community",
            iconNameLeft: "phone",
            iconColorLeft: "#ff8c00"
        }, {
            title:  sex ,
            iconType: "material-community",
            iconNameLeft: "gender-male-female",
            iconColorLeft: "#ff8c00"
        }, {
            title:  nationality ,
            iconType: "material-community",
            iconNameLeft: "home-city",
            iconColorLeft: "#ff8c00"
        }
            , {
            title:  address ,
            iconType: "material-community",
            iconNameLeft: "map-marker",
            iconColorLeft: "#ff8c00"
        }
        ]
    }

    return (<View style={styles.viewStyle}>
        <Avatar
            size="xlarge"
            rounded
            icon={{ name: 'user', color: 'white', type: 'font-awesome' }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
        />
        {
            map(menuOptions, (menu, index) => (
                <ListItem key={index}
                    title={menu.title}
                    onPress={menu.onPress}
                    titleStyle={styles.titleColor}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    containerStyle={styles.menuItem} />
            )
            )}

    </View>)
}
const styles = StyleSheet.create({

    titleColor: {
      color: "#008ba3",
      fontWeight:"bold"
    },
    viewStyle: {
        marginTop: 24,
        backgroundColor: "#ff8c00",
        flex: 1,
        flexDirection: "column"
        , marginBottom: 72
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})
