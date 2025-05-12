// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy5N7kgrjleyC0rgY2XBbDn2ujXMFvr3M",
  authDomain: "pmn-39d78.firebaseapp.com",
  projectId: "pmn-39d78",
  storageBucket: "pmn-39d78.firebasestorage.app",
  messagingSenderId: "291350514581",
  appId: "1:291350514581:web:41e2792209b761ff06c49c",
  measurementId: "G-L52G785JRS"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
