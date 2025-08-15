// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgAowODgB-CGUlNBjczvy6K9PiNTdX-dk",
  authDomain: "onlineservices-34ceb.firebaseapp.com",
  projectId: "onlineservices-34ceb",
  storageBucket: "onlineservices-34ceb.firebasestorage.app",
  messagingSenderId: "1066587511498",
  appId: "1:1066587511498:web:3ed930f6132814f8d73233",
  measurementId: "G-9S4K8HD1TY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
