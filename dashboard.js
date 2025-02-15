// Firebase Modules Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
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

// DOMContentLoaded Event (Ensure DOM is Loaded Before Executing JS)
document.addEventListener("DOMContentLoaded", function() {
    const userName = document.getElementById("user-name");
    const userEmail = document.getElementById("user-email");
    const walletBalance = document.getElementById("wallet-balance");
    const logoutBtn = document.getElementById("logout-btn");

    // Check if user is logged in
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User logged in:", user); // Debugging

            // Show User Email & Name
            if (userEmail) {
                userEmail.innerText = user.email || "No Email Found";
            } else {
                console.error("Element with ID 'user-email' not found in DOM");
            }

            if (userName) {
                userName.innerText = user.displayName || "User";
            }

            // Fetch User Wallet Balance
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                walletBalance.innerText = "₹" + userSnap.data().balance.toFixed(2);
            } else {
                // If User Not Found in Database, Create Entry
                await setDoc(userRef, { balance: 0.00 });
                walletBalance.innerText = "₹0.00";
            }
        } else {
            window.location.href = "index.html"; // Redirect to Login Page
        }
    });

    // Logout Button Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            signOut(auth).then(() => {
                window.location.href = "index.html"; // Redirect to Login Page After Logout
            }).catch((error) => {
                alert("Error logging out: " + error.message);
            });
        });
    } else {
        console.error("Logout button not found in DOM");
    }
});
