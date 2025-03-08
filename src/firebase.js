import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDGyTdshG6Uo6M-tBCsbLRtGFc7NY_wgWI",
    authDomain: "cyberdelta-ef7ca.firebaseapp.com",
    projectId: "cyberdelta-ef7ca",
    storageBucket: "cyberdelta-ef7ca.firebasestorage.app",
    messagingSenderId: "408213568844",
    appId: "1:408213568844:web:f8886d41a3896e25e7e3e9",
    measurementId: "G-SNWWXT2B6P"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };