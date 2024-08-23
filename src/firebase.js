// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxxKulYjCfTAXB7fCsCHd7nBdkzdz_R1g",
  authDomain: "cdwiki-73e46.firebaseapp.com",
  projectId: "cdwiki-73e46",
  storageBucket: "cdwiki-73e46.appspot.com",
  messagingSenderId: "847269438101",
  appId: "1:847269438101:web:0b2a31589268a54d7ab19c",
  measurementId: "G-J937FR6FM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app)
// const analytics = getAnalytics(app);

export {storage, auth};
export default getFirestore();