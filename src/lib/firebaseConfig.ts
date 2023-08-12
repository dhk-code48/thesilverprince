// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV_wozpIUXbmKc-dreOvmz0D1YxXF1PIM",
  authDomain: "the-silver-prince.firebaseapp.com",
  projectId: "the-silver-prince",
  storageBucket: "the-silver-prince.appspot.com",
  messagingSenderId: "682484119735",
  appId: "1:682484119735:web:2cf31463b15660276fb532",
  measurementId: "G-N95QH7B521",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
