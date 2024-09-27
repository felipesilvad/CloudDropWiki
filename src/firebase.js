import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import 'firebase/compat/analytics';

firebase.initializeApp({
  apiKey: "AIzaSyDxxKulYjCfTAXB7fCsCHd7nBdkzdz_R1g",
  authDomain: "cdwiki-73e46.firebaseapp.com",
  projectId: "cdwiki-73e46",
  storageBucket: "cdwiki-73e46.appspot.com",
  messagingSenderId: "847269438101",
  appId: "1:847269438101:web:0b2a31589268a54d7ab19c",
  measurementId: "G-J937FR6FM8"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();
export {auth, firestore};
