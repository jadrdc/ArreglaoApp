import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDijnXhVwrEcGrcPnPO7sk1i9nlGqkrX5I",
    authDomain: "arreglaoapp-a76dc.firebaseapp.com",
    databaseURL: "https://arreglaoapp-a76dc.firebaseio.com",
    projectId: "arreglaoapp-a76dc",
    storageBucket: "arreglaoapp-a76dc.appspot.com",
    messagingSenderId: "102361859495",
    appId: "1:102361859495:web:d3eb69bbc9b30dd9e1e282",
    measurementId: "G-4GST2HYDBR"
  };
  // Initialize Firebase
  //export const firebaseApp=firebase.initializeApp(firebaseConfig);

  
const firebaseApp=  firebase.initializeApp(firebaseConfig);

export default firebaseApp
