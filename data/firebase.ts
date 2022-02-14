import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKVHVnhSDLy5d0dH0upXeBPPQFZSURez0",
  authDomain: "study-index.firebaseapp.com",
  projectId: "study-index",
  storageBucket: "study-index.appspot.com",
  messagingSenderId: "567407475683",
  appId: "1:567407475683:web:13021cd6074f6da0ccfed6",
  measurementId: "G-71KMQ12PD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export default app;