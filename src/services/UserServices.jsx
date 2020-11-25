import * as firebase from 'firebase'
import 'firebase/firestore';
const storage = firebase.firestore();



export async function getServices(updateUI) {
    const querySnapshot = await storage.collection("services").get()
    const services = []
    querySnapshot.forEach((doc) => {
        services.push(doc.data())
    });
    updateUI(services)
}


export async function getServicesOffers(serviceId) {
    const querySnapshot = await storage.collection("services-offers").where('serviceId', '==', serviceId).get()
    const servicesOffer = []
    querySnapshot.forEach((doc) => {
        servicesOffer.push(doc.data())
    });

    console.log(servicesOffer);

}

export async function registerUser(user,updateSignUser) {
    return await storage.collection('users').doc(user.email).set(user)
      
}

export async function login(email) {
    return await storage.collection('users').doc(email).get()
      
}