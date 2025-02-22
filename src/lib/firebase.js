import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC79dSNbcxRzPwe4_Snc1FTDBbexuEOn5c",
  authDomain: "tasker-cd0d3.firebaseapp.com",
  projectId: "tasker-cd0d3",
  storageBucket: "tasker-cd0d3.firebasestorage.app",
  messagingSenderId: "674466471469",
  appId: "1:674466471469:web:b14d60a7d0c7a8080662a4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
