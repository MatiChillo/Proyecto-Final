import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const FIREBASE_APIKEY = process.env.FIREBASE_APIKEY;
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROYECT_ID = process.env.FIREBASE_PROYECT_ID;
const FIREBASE_BUCKET = process.env.FIREBASE_BUCKET;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
const FIREBASE_SENDER_ID = process.env.FIREBASE_SENDER_ID;

const firebaseConfig = {

    apiKey: FIREBASE_APIKEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROYECT_ID,
    storageBucket: FIREBASE_BUCKET,
    appId: FIREBASE_APP_ID,
    messagingSenderId: FIREBASE_SENDER_ID

};

const firebaseApp = initializeApp( firebaseConfig );

const firebaseDB = getFirestore( firebaseApp );

console.log("FIREBASE CONNECTED");

export default firebaseDB;