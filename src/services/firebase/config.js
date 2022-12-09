import admin from "firebase-admin";

import serviceAccount from "./config.json";

admin.initializeApp({

    credential: admin.credential.cert(serviceAccount)

});

const db = admin.firebase();
const query = db.collection('')

console.log("FIREBASE CONNECTED");