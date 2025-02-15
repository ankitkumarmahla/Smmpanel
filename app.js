import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
 apiKey: "AIzaSyDbh__UitSrtQCcgnxcPMz31plcClC3ND4",
  authDomain: "panelsmm-10a25.firebaseapp.com",
  projectId: "panelsmm-10a25",
  storageBucket: "panelsmm-10a25.firebasestorage.app",
  messagingSenderId: "997413113102",
  appId: "1:997413113102:web:44ba6b4c7bc39708339b5f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const toggleForm = document.getElementById("toggle-form");
const formTitle = document.getElementById("form-title");

// Toggle Between Login & Register
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

// User Login
loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// User Registration
registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Account Created Successfully!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
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
        toggleForm.innerHTML = `Don't have an account? <span>Sign up</span>`;
    } else {
        formTitle.innerText = "Sign Up";
        loginBtn.style.display = "none";
        registerBtn.style.display = "block";
        toggleForm.innerHTML = `Already have an account? <span>Login</span>`;
    }
});

loginBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

registerBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account Created Successfully!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

googleLoginBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            alert("Google Sign-in Successful!");
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
