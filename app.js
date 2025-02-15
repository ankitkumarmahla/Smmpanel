import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbh__UitSrtQCcgnxcPMz31plcClC3ND4",
    authDomain: "panelsmm-10a25.firebaseapp.com",
    projectId: "panelsmm-10a25",
    storageBucket: "panelsmm-10a25.firebasestorage.com",
    messagingSenderId: "997413113102",
    appId: "1:997413113102:web:44ba6b4c7bc39708339b5f",
    measurementId: "G-0DWF5XZ108"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Form elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const googleLoginBtn = document.getElementById("google-login-btn");
const toggleForm = document.getElementById("toggle-form");
const formTitle = document.getElementById("form-title");

// Toggle between login and signup
let isLogin = true;
toggleForm.addEventListener("click", () => {
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.innerText = "Login";
        loginBtn.style.display = "block";
        registerBtn.style.display = "none";
        toggleForm.innerHTML = `Don't have an account? <span>Sign up</span>`;
    } else {
        formTitle.innerText = "Sign Up";
        loginBtn.style.display = "none";
        registerBtn.style.display = "block";
        toggleForm.innerHTML = `Already have an account? <span>Login</span>`;
    }
});

// Login Function
loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// Register Function (with Firestore)
registerBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore में नया यूजर सेव करें
        await setDoc(doc(db, "users", user.uid), {
            email: email,
            name: "New User",
            balance: 0,  // Default balance
        });

        alert("Account Created Successfully!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Google Sign-In (with Firestore)
googleLoginBtn.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check if user already exists in Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            // If new user, add to Firestore
            await setDoc(userRef, {
                email: user.email,
                name: user.displayName || "Google User",
                balance: 0,  // Default balance
            });
        }

        alert("Google Sign-in Successful!");
        window.location.href = "dashboard.html";
    } catch (error) {
        alert("Error: " + error.message);
    }
});
