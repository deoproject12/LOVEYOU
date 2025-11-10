// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj6bvoIRn2Dyv8AM03CvuZYr95_AS_PBw",
  authDomain: "loveyou-1acec.firebaseapp.com",
  projectId: "loveyou-1acec",
  storageBucket: "loveyou-1acec.firebasestorage.app",
  messagingSenderId: "112325849461",
  appId: "1:112325849461:web:f77f98473d4e59ca8aa33c",
  measurementId: "G-7QJZNSFH4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);