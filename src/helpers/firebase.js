// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyDpsS4BwgmztchGFigi4tT2x_FNqlm_XhI",
  authDomain: "codeflix-vite.firebaseapp.com",
  projectId: "codeflix-vite",
  storageBucket: "codeflix-vite.appspot.com",
  messagingSenderId: "63899913189",
  appId: "1:63899913189:web:9164c3c3399cb8d7b2bd0c",
  measurementId: "G-4BR1R6J49Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app); 

export { db, auth };
