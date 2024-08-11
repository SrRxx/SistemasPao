// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbBHvZcnc1D3VjJuv12YbXbzXlSnljFCo",
  authDomain: "sistemaspao-1e910.firebaseapp.com",
  projectId: "sistemaspao-1e910",
  storageBucket: "sistemaspao-1e910.appspot.com",
  messagingSenderId: "969014915392",
  appId: "1:969014915392:web:0e421538f1399b40974aa5",
  measurementId: "G-17D7YT4TZE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
