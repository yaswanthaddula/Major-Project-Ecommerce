// scripts/address.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB7KsWtxt0d5j3mYtv-U3K9LoqbAuDD6Xs",
  authDomain: "ecommerce-eb22f.firebaseapp.com",
  projectId: "ecommerce-eb22f",
  storageBucket: "ecommerce-eb22f.appspot.com",
  messagingSenderId: "968284003766",
  appId: "1:968284003766:web:d1d31b776618f19039f517"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const form = document.getElementById("address-form");
const paymentSection = document.getElementById("payment-section");
const payNowBtn = document.getElementById("pay-now");

let addressData = null; // store address temporarily

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get address data
  addressData = {
    fullname: document.getElementById("fullname").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    pincode: document.getElementById("pincode").value,
    phone: document.getElementById("phone").value,
    cartItems: JSON.parse(localStorage.getItem("cart")) || []
  };

  // Hide address form, show payment section
  form.style.display = "none";
  paymentSection.style.display = "block";
});

payNowBtn.addEventListener("click", () => {
  const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
  if (!selectedPayment) {
    alert("Please select a payment method");
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          ...addressData,
          paymentMethod: selectedPayment.value,
          timestamp: new Date()
        });

        localStorage.removeItem("cart");
        window.location.href = "success.html";
      } catch (err) {
        alert("Failed to place order: " + err.message);
      }
    } else {
      alert("User not logged in!");
      window.location.href = "login.html";
    }
  });
});
