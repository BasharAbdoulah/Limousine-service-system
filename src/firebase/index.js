// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZdOA5t60yx-OBfwN8T7F3vrJiPP7tw14",
  authDomain: "alnoukhazasystem.firebaseapp.com",
  projectId: "alnoukhazasystem",
  storageBucket: "alnoukhazasystem.appspot.com",
  messagingSenderId: "786326159660",
  appId: "1:786326159660:web:f5c429bf70771a1d622c89",
  measurementId: "G-CGR8J1FD9N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage();
