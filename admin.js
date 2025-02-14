import { db, auth, signOut } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById("add-service-btn").addEventListener("click", async () => {
    const name = document.getElementById("service-name").value;
    const price = document.getElementById("service-price").value;

    if (name && price) {
        await addDoc(collection(db, "services"), { name, price: Number(price) });
        alert("Service added successfully!");
    } else {
        alert("Please enter service details!");
    }
});

document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});
