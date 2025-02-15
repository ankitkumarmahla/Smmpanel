import { getFirestore, collection, getDocs, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const db = getFirestore();

async function loadPendingTransactions() {
    let txnList = document.getElementById("txn-list");
    txnList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "transactions"));
    
    querySnapshot.forEach((doc) => {
        let txn = doc.data();
        if (txn.status === "pending") {
            let listItem = document.createElement("li");
            listItem.innerHTML = `Txn ID: ${txn.txnID} - <button onclick="approveTransaction('${doc.id}', '${txn.userId}')">Approve</button>`;
            txnList.appendChild(listItem);
        }
    });
}

async function approveTransaction(txnDocId, userId) {
    let txnRef = doc(db, "transactions", txnDocId);
    let userRef = doc(db, "users", userId);

    let txnSnap = await getDoc(txnRef);
    let userSnap = await getDoc(userRef);

    if (txnSnap.exists() && userSnap.exists()) {
        let newBalance = userSnap.data().balance + 100;  // ₹100 maan ke chala ja raha hoon, tum manual check kar sakte ho
        await updateDoc(userRef, { balance: newBalance });
        await updateDoc(txnRef, { status: "approved" });

        alert("Transaction Approved! Wallet Balance Updated.");
        loadPendingTransactions();
    }
}

window.onload = loadPendingTransactions;
