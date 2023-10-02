import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAn98kI2QBcy8xCTZ59KSke4GIY5trEUHE",
  authDomain: "cnature-app.firebaseapp.com",
  projectId: "cnature-app",
  storageBucket: "cnature-app.appspot.com",
  messagingSenderId: "111602365809",
  appId: "1:111602365809:web:d5c2ed8a59d5006ae1f2d0",
  measurementId: "G-CFB6N7YBKW",
};
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const firebaseAuth = getAuth(firebaseApp);
const db = firebase.firestore();

export { firebase, db, firebaseAuth };
