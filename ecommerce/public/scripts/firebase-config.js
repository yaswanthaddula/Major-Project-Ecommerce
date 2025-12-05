// scripts/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// ✅ Your actual Firebase config (DO NOT CHANGE ORDER)
const firebaseConfig = {
  apiKey: "AIzaSyB7KsWtxt0d5j3mYtv-U3K9LoqbAuDD6Xs",
  authDomain: "ecommerce-eb22f.firebaseapp.com",
  projectId: "ecommerce-eb22f",
  storageBucket: "ecommerce-eb22f.appspot.com",
  messagingSenderId: "968284003766",
  appId: "1:968284003766:web:d1d31b776618f19039f517"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Optional debug log to confirm Firebase is loaded
console.log("✅ Firebase initialized successfully");