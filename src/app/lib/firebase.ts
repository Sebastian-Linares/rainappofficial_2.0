// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkYReuHUu0pwWkGv9X7c7ib4nNYcKW0ss",
  authDomain: "rain-chat-official.firebaseapp.com",
  projectId: "rain-chat-official",
  storageBucket: "rain-chat-official.firebasestorage.app",
  messagingSenderId: "902659132211",
  appId: "1:902659132211:web:fcf613e2147cc89dcc8c46",
  measurementId: "G-F92VFB8H6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);