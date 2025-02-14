import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

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

async function loadServices() {
  const servicesCollection = collection(db, "services");
  const servicesSnapshot = await getDocs(servicesCollection);
  const servicesList = document.getElementById("services-list");
  servicesList.innerHTML = "";

  servicesSnapshot.forEach((doc) => {
    const service = doc.data();
    const row = `
      <tr>
        <td>${service.name}</td>
        <td>₹${service.price}</td>
        <td>${service.description}</td>
        <td>${service.category}</td>
      </tr>
    `;
    servicesList.innerHTML += row;
  });
}

// Call the function when admin panel loads
loadServices();
