// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB_Yw7ShKotJ7lidocPgwTLAtQCHexWkM",
  authDomain: "sistemaspao-a1f74.firebaseapp.com",
  projectId: "sistemaspao-a1f74",
  storageBucket: "sistemaspao-a1f74.appspot.com",
  messagingSenderId: "494794061744",
  appId: "1:494794061744:web:c4c2f581e522a874df0875",
  measurementId: "G-7LGWJTGVRE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
