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
