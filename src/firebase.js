// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDisD_Owf9QDh7l09n7GKkIVTARMU1EHS0",
  authDomain: "hngx-gallery-app.firebaseapp.com",
  projectId: "hngx-gallery-app",
  storageBucket: "hngx-gallery-app.appspot.com",
  messagingSenderId: "791940524146",
  appId: "1:791940524146:web:3d6f51f02e251ca0bfbaeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
