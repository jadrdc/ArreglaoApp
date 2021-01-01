import * as firebase from 'firebase'
import 'firebase/firestore';
const storage = firebase.firestore();
import AsyncStorage from '@react-native-async-storage/async-storage';



export async function getServices(updateUI) {
    const querySnapshot = await storage.collection("services").get()
    const services = []
    querySnapshot.forEach((doc) => {
        services.push(doc.data())
    });
    updateUI(services)
}


export async function getServicesOffers(serviceId, setServicesOffers) {
    const querySnapshot = await storage.collection("services-offers").where('serviceId', '==', serviceId).get()
    const servicesOffer = []
    querySnapshot.forEach((doc) => {
        servicesOffer.push(doc.data())
    });
    setServicesOffers(servicesOffer)
}

export async function registerUser(user) {
    return await storage.collection('users').doc(user.email).set(user)

}

export async function scheduleService(schedule) {
    return await storage.collection('reservations').add(schedule)

}

export async function findSchedulesByUser(user, setUI) {
    const querySnapshot = await storage.collection("reservations").where('email', '==', user).get()
    const servicesOffer = []
    querySnapshot.forEach((doc) => {
        servicesOffer.push(doc.data())
    });

    setUI(servicesOffer)

}

export async function findAllSchedule(setHistoric) {
    const querySnapshot = await storage.collection("reservations").get()
    const servicesOffer = []
    querySnapshot.forEach((doc) => {
        var schedule = doc.data();
        schedule.id = doc.id
        servicesOffer.push(schedule)
    });
    setHistoric(servicesOffer)
}
export async function loginUser(email) {
    return await storage.collection('users').doc(email).get()

}


export async function saveUser(user) {

    const userInfo = JSON.stringify(user)
    return await AsyncStorage.setItem('@user', userInfo)

}



export async function loadUser() {

    return await AsyncStorage.getItem('@user')

}


export async function logout() {

    return await AsyncStorage.clear()

}


export async function confirmOrder(item) {
    return await storage.collection('reservations').doc(item.id).set(
        {
            date: item.date, dop: item.dop, usd: item.usd,isComfirmed:"Confirmado",
            email: item.email, hours: item.hours, minutes: item.minutes,services:item.services
    })

}





