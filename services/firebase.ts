import {initializeApp} from "firebase/app"; 
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBQo1VJAM5sfna9t4tJ83aqk3p-NWMkdNU",
  authDomain: "crossneuron-bca3d.firebaseapp.com",
  projectId: "crossneuron-bca3d",
  storageBucket: "crossneuron-bca3d.firebasestorage.app",
  messagingSenderId: "33472829509",
  appId: "1:33472829509:web:f545f863eef5ac6e312b2c",
  measurementId: "G-73VZRBEGRZ"
}; 

const app= initializeApp(firebaseConfig); 
export const auth= getAuth(app); 
export const db= getFirestore(app); 