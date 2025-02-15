firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("userEmail").innerText = user.email; // Email Show करें
        fetchWalletBalance(user.uid); // Wallet Balance लोड करें
    } else {
        window.location.href = "login.html"; // अगर यूजर लॉगिन नहीं है, तो लॉगिन पेज पर भेजें
    }
});

// Firebase Firestore से Wallet Balance लोड करने का फ़ंक्शन
function fetchWalletBalance(userId) {
    firebase.firestore().collection("users").doc(userId)
    .get()
    .then((doc) => {
        if (doc.exists) {
            document.getElementById("walletBalance").innerText = "₹" + doc.data().wallet;
        } else {
            document.getElementById("walletBalance").innerText = "₹0.00";
        }
    })
    .catch((error) => {
        console.error("Error fetching wallet balance: ", error);
    });
} 
