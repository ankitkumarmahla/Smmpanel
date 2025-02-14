import { auth, db, signOut } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "index.html";
    } else {
        document.getElementById("user-name").textContent = user.displayName;
    }

    const servicesRef = collection(db, "services");
    const querySnapshot = await getDocs(servicesRef);
    const servicesList = document.getElementById("services-list");

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const serviceElement = document.createElement("div");
        serviceElement.innerHTML = `<h3>${data.name}</h3><p>Price: ₹${data.price}</p>`;
        servicesList.appendChild(serviceElement);
    });
});

document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });
});
