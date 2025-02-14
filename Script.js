import { auth, provider, signInWithPopup, signOut } from "./firebase-config.js";

document.getElementById("google-login-btn").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Google Login Error:", error);
            alert("Login failed! Try again.");
        });
});
