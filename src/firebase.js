import firebase from 'firebase';

import "firebase/app";
import "firebase/firestore";
import "firebase/database";

export const firebase_config = firebase.initializeApp({
    apiKey: "AIzaSyAECqgqvecHYkxK3_dykpq3jKHJdVk-ccA",
    authDomain: "asistance-6f6d5.firebaseapp.com",
    databaseURL: "https://asistance-6f6d5.firebaseio.com",
    projectId: "asistance-6f6d5",
    storageBucket: "asistance-6f6d5.appspot.com",
    messagingSenderId: "828922871733"
});

export const db = firebase_config.firestore();
export const db_realtime = firebase.database();
