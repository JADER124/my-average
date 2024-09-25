// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBK1uyOH2EL3GUI-9WkwjPYmmo97ktL_M",
  authDomain: "myaverage-1ee4a.firebaseapp.com",
  projectId: "myaverage-1ee4a",
  storageBucket: "myaverage-1ee4a.appspot.com",
  messagingSenderId: "1090281846974",
  appId: "1:1090281846974:web:8a6159e5b4ad27bc36c6ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
