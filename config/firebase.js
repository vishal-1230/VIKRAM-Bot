import firebase from 'firebase';

const config = {
    "apiKey": "AIzaSyA4G4HJKGGnrUPxDf2xzqm9b-v6GidbvBk",
    "authDomain": "yuci-delhi.firebaseapp.com",
    "databaseURL": "https://yuci-delhi-default-rtdb.asia-southeast1.firebasedatabase.app",
    "projectId": "yuci-delhi",
    "storageBucket": "yuci-delhi.appspot.com",
    "messagingSenderId": "1096568349203",
    "appId": "1:1096568349203:web:3b619c5e43f747c88055e6",
    "measurementId": "G-N3X2HSHX3C"
}

const app = firebase.initializeApp(config)
export default app;