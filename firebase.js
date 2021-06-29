import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA4NeZG9SuJBwgbex8aHSp8i5SdyhURwXY",
    authDomain: "clone-vishal.firebaseapp.com",
    projectId: "clone-vishal",
    storageBucket: "clone-vishal.appspot.com",
    messagingSenderId: "896286152813",
    appId: "1:896286152813:web:1e18c92b6dac55c312c764"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore()

export default db