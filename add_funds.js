import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDbh__UitSrtQCcgnxcPMz31plcClC3ND4",
  authDomain: "panelsmm-10a25.firebaseapp.com",
  projectId: "panelsmm-10a25",
  storageBucket: "panelsmm-10a25.firebasestorage.app",
  messagingSenderId: "997413113102",
  appId: "1:997413113102:web:44ba6b4c7bc39708339b5f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("confirmPayment").addEventListener("click", async () => {
    const amount = document.getElementById("amount").value;
    
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const paymentRef = doc(db, "payments", user.uid);
            await setDoc(paymentRef, {
                uid: user.uid,
                amount: parseFloat(amount),
                timestamp: serverTimestamp(),
                status: "pending"
            });

            document.getElementById("message").innerText = "Payment request sent to admin.";
        } else {
            alert("You are not logged in!");
        }
    });
});
