// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX67lY0JVtUjtz8loMAmcOE6qQ2fQTfmY",
  authDomain: "expense-tracker-test-17d2d.firebaseapp.com",
  projectId: "expense-tracker-test-17d2d",
  storageBucket: "expense-tracker-test-17d2d.appspot.com",
  messagingSenderId: "912149026707",
  appId: "1:912149026707:web:5ce8a3aae06ea630f33a66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize firestore
const db = getFirestore(app);