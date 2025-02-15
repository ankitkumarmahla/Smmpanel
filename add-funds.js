import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

function generateUPILink() {
    let amount = document.getElementById("amount").value;
    
    if (amount < 10) {
        alert("Minimum ₹10 add karna zaroori hai!");
        return;
    }

    let upiID = "smmpanelindai@axl";  // Tumhari UPI ID
    let upiLink = `upi://pay?pa=${upiID}&pn=SMMPANEL&mc=&tid=&tr=&tn=Wallet%20Top-up&am=${amount}&cu=INR`;

    // QR Code aur Link show karna
    document.getElementById("upi-link").href = upiLink;
    document.getElementById("upi-link").style.display = "block";

    let qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
    document.getElementById("qr-code").src = qrCodeURL;
    document.getElementById("qr-code").style.display = "block";
}

function submitTransaction() {
    let txnID = document.getElementById("transaction-id").value;

    if (txnID.length < 8) {
        alert("Valid Transaction ID Enter Karo!");
        return;
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                await addDoc(collection(db, "transactions"), {
                    userId: user.uid,
                    txnID: txnID,
                    status: "pending",
                    timestamp: new Date()
                });
                alert("Transaction Submitted! Admin approval ke baad balance update hoga.");
            } catch (error) {
                console.error("Error submitting transaction: ", error);
            }
        } else {
            alert("Please login first!");
        }
    });
}
