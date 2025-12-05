import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("welcomeUser").textContent = `👋 Welcome, ${user.email}`;
  } else {
    window.location.href = "login.html";
  }
});
