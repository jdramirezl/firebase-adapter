import * as dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    deleteUser,
} from 'firebase/auth';
import * as admin from 'firebase-admin';
const serviceAccount = require("../firebaseService.json");

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

initializeApp(firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    admin,
    updateProfile,
    deleteUser,
    serviceAccount
};
