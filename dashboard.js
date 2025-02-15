// Firebase Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbh__UitSrtQCcgnxcPMz31plcClC3ND4",
  authDomain: "panelsmm-10a25.firebaseapp.com",
  projectId: "panelsmm-10a25",
  storageBucket: "panelsmm-10a25.firebasestorage.app",
  messagingSenderId: "997413113102",
  appId: "1:997413113102:web:44ba6b4c7bc39708339b5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Elements
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const walletBalance = document.getElementById("wallet-balance");
const logoutBtn = document.getElementById("logout-btn");

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
    if (user) {
        userName.innerText = user.displayName || "User";
        userEmail.innerText = user.email;

        // Get user wallet data
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            walletBalance.innerText = userSnap.data().balance.toFixed(2);
        } else {
            // Create new user with ₹0 balance
            await setDoc(userRef, { balance: 0.00 });
            walletBalance.innerText = "0.00";
        }
    } else {
        window.location.href = "index.html"; // Redirect to login if not logged in
    }
});

// Logout
logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    }).catch((error) => {
        alert("Error logging out: " + error.message);
    });
});
