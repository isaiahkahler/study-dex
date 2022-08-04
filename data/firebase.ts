import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRC6h2fPk2CJpYxxtTYon0MnLMXKMs1N0",
  authDomain: "study-dex.firebaseapp.com",
  projectId: "study-dex",
  storageBucket: "study-dex.appspot.com",
  messagingSenderId: "695618446936",
  appId: "1:695618446936:web:888faafdb12c489cb7cc2d",
  measurementId: "G-Y6N0CLXFW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export default app;