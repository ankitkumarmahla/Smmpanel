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
