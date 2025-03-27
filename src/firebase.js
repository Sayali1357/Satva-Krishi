// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjoWn_mgdzgrqlm7u8yLEUO4lTwXBNKuA",
  authDomain: "satva-krishi.firebaseapp.com",
  projectId: "satva-krishi",
  storageBucket: "satva-krishi.appspot.com",

  messagingSenderId: "368113073764",
  appId: "1:368113073764:web:8123bc914c35721e7fa971",
  measurementId: "G-TK3L081P6B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const db = getFirestore(app); // Firestore DB
const auth = getAuth(app); // Authentication
const storage = getStorage(app); // Storage for file uploads

// Export Firebase services
export { db, auth, storage };
