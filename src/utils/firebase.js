// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "showly-8cfa1.firebaseapp.com",
  projectId: "showly-8cfa1",
  storageBucket: "showly-8cfa1.appspot.com",
  messagingSenderId: "746408607078",
  appId: "1:746408607078:web:d0d0be2e9a691aab6f1ca7",
  measurementId: "G-LM2PJNSQ6D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export { signInWithPopup, signInAnonymously };
