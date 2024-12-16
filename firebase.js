import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCpgBfbp4AZd0l1b1uKsZXAls7wVSLsWc",
  authDomain: "fir-auth-a5a10.firebaseapp.com",
  projectId: "fir-auth-a5a10",
  storageBucket: "fir-auth-a5a10.appspot.com",
  messagingSenderId: "317193971195",
  appId: "1:317193971195:web:ca9f08ad1b296adc2f575e",
  measurementId: "G-PV66RB7C7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app); // Export auth here
