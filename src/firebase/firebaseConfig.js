// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL05ENGSAHgLYzITiaO3FA9euD3fJGTVA",
  authDomain: "mouse-race-1e368.firebaseapp.com",
  projectId: "mouse-race-1e368",
  storageBucket: "mouse-race-1e368.appspot.com",
  messagingSenderId: "378258516235",
  appId: "1:378258516235:web:d89ed4eea46a3f0b281a0e",
  measurementId: "G-CSJGG1N6LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);