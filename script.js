import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { auth, provider, signInWithPopup, signOut } from "./firebase-config.js";

const db = getFirestore();
const servicesList = document.getElementById("services-list");

async function loadServices() {
    try {
        const querySnapshot = await getDocs(collection(db, "services"));
        servicesList.innerHTML = "";

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
            servicesList.appendChild(serviceElement);
        });

    } catch (error) {
        console.error("Error loading services:", error);
    }
}
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    }).catch((error) => {
        console.error("Logout Error:", error);
    });
})

window.onload = loadServices;
