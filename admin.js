import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbh__UitSrtQCcgnxcPMz31plcClC3ND4",
  authDomain: "panelsmm-10a25.firebaseapp.com",
  projectId: "panelsmm-10a25",
  storageBucket: "panelsmm-10a25.firebasestorage.app",
  messagingSenderId: "997413113102",
  appId: "1:997413113102:web:44ba6b4c7bc39708339b5f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadUsers() {
    const userList = document.getElementById("user-list");
    userList.innerHTML = "<p>Loading...</p>";

    const usersRef = collection(db, "users");
    const usersSnap = await getDocs(usersRef);

    userList.innerHTML = "";
    usersSnap.forEach((doc) => {
        const userData = doc.data();
        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>Email:</strong> ${userData.email || "No Email"}</p>
            <p><strong>Balance:</strong> ₹<span id="balance-${doc.id}">${userData.balance.toFixed(2)}</span></p>
            <input type="number" id="update-${doc.id}" placeholder="Enter new balance">
            <button onclick="updateBalance('${doc.id}')">Update</button>
            <hr>
        `;
        userList.appendChild(div);
    });
}

async function updateBalance(userId) {
    const newBalance = document.getElementById(`update-${userId}`).value;

    if (!newBalance || newBalance < 0) {
        alert("Please enter a valid balance amount.");
        return;
    }

    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { balance: parseFloat(newBalance) });

    document.getElementById(`balance-${userId}`).innerText = parseFloat(newBalance).toFixed(2);
    alert("Balance updated successfully!");
}

loadUsers();
