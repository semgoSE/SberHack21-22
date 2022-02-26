import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbxEuSMvTUZYKIC7UjS7zRQTGyd14bxs8",
  authDomain: "sbrf-9dc3f.firebaseapp.com",
  projectId: "sbrf-9dc3f",
  storageBucket: "sbrf-9dc3f.appspot.com",
  messagingSenderId: "116889787119",
  appId: "1:116889787119:web:fb995dbda79e879f4d991a",
  measurementId: "G-X3FM8M45X6"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_store = getFirestore();
const analytics = getAnalytics(firebase_app);
