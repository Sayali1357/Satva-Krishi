// Import the functions you need from the SDKs you need
// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjoWn_mgdzgrqlm7u8yLEUO4lTwXBNKuA",
  authDomain: "satva-krishi.firebaseapp.com",
  projectId: "satva-krishi",
  storageBucket: "satva-krishi.firebasestorage.app",
  messagingSenderId: "368113073764",
  appId: "1:368113073764:web:8123bc914c35721e7fa971",
  measurementId: "G-TK3L081P6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };