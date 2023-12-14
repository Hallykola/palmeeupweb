// Import the functions you need from the SDKs you need
import { initializeApp,firebase } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT9LzKjYsX-OTlq_v-K1TqytQqUQKpaXc",
  authDomain: "pal-mee-up.firebaseapp.com",
  projectId: "pal-mee-up",
  storageBucket: "pal-mee-up.appspot.com",
  messagingSenderId: "467410670272",
  appId: "1:467410670272:web:6b3dfff2e45c01a07cd325",
  measurementId: "G-8R0NZ5W5RS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const auth = getAuth();

export const mycollection = collection; 
export const mygetDocs = getDocs; 

// export  const db = getFirestore(app);                                                                                                                                                           