import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbh__UitSrtQCcgnxcPMz31plcClC3ND4",
  authDomain: "panelsmm-10a25.firebaseapp.com",
  projectId: "panelsmm-10a25",
  storageBucket: "panelsmm-10a25.firebasestorage.com",
  messagingSenderId: "997413113102",
  appId: "1:997413113102:web:44ba6b4c7bc39708339b5f",
  measurementId: "G-0DWF5XZ108"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// HTML Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const nameInput = document.getElementById("name"); // Added name input
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const googleLoginBtn = document.getElementById("google-login-btn");
const toggleForm = document.getElementById("toggle-form");
const formTitle = document.getElementById("form-title");

let isLogin = true;
toggleForm.addEventListener("click", () => {
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.innerText = "Login";
        loginBtn.style.display = "block";
        registerBtn.style.display = "none";
        nameInput.style.display = "none"; // Hide name field during login
        toggleForm.innerHTML = `Don't have an account? <span>Sign up</span>`;
    } else {
        formTitle.innerText = "Sign Up";
        loginBtn.style.display = "none";
        registerBtn.style.display = "block";
        nameInput.style.display = "block"; // Show name field during signup
        toggleForm.innerHTML = `Already have an account? <span>Login</span>`;
    }
});

// **Login Function**
loginBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// **Signup Function (Firestore Data Store Included)**
registerBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value; // Get name from input

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            balance: 0 // Initial balance
        });

        alert("Account Created Successfully!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// **Google Sign-in (Firestore Data Store Included)**
googleLoginBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
            // Store user data in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName || "User",
                email: user.email,
                balance: 0 // Initial balance
            });
        }

        alert("Google Sign-in Successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
        alert("Error: " + error.message);
    }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// अब Firebase Authentication को एक्सेस कर सकते हैं
document.getElementById("login-btn").addEventListener("click", function () {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
