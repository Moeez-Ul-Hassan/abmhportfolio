import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAij6Vf5SUJ62AsYwVzATkUCrPHUG3HT8Y",
  authDomain: "abmh-try.firebaseapp.com",
  projectId: "abmh-try",
  storageBucket: "abmh-try.firebasestorage.app",
  messagingSenderId: "837143115792",
  appId: "1:837143115792:web:3c9b67288fa55a8e25b295",
  measurementId: "G-DGGHP6W9H1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); 