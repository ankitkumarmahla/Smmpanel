import { auth, provider, signInWithPopup, signOut, db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

const servicesContainer = document.getElementById("services-container");

async function loadServices() {
    try {
        const querySnapshot = await getDocs(collection(db, "services"));
        servicesContainer.innerHTML = "";
        
        if (querySnapshot.empty) {
            servicesContainer.innerHTML = "<p>No services available</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const service = doc.data();
            const serviceElement = document.createElement("div");
            serviceElement.classList.add("service-card");
            serviceElement.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <strong>Price: ₹${service.price}</strong>
                <button onclick="orderService('${doc.id}', ${service.price})">Order Now</button>
            `;
            servicesContainer.appendChild(serviceElement);
        });
    } catch (error) {
        console.error("Error loading services:", error);
        servicesContainer.innerHTML = "<p>Failed to load services. Try again later.</p>";
    }
}

window.onload = loadServices;
