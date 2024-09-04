import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "tdmovie-1004.firebaseapp.com",
  projectId: "tdmovie-1004",
  storageBucket: "tdmovie-1004.appspot.com",
  messagingSenderId: "836254344279",
  appId: "1:836254344279:web:d62fbbc6203808aef96f12",
  measurementId: "G-4171DM922S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseFirestore = firebase.firestore();
const firebaseStorage = firebase.storage();

export { firebaseAuth, firebaseFirestore, firebaseStorage };
