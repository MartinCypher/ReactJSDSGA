import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCIfwx3DmItvItO2s4WJlazcqgczgazZ7U",
    authDomain: "martin-ecommerce-dsga.firebaseapp.com",
    projectId: "martin-ecommerce-dsga",
    storageBucket: "martin-ecommerce-dsga.appspot.com",
    messagingSenderId: "651290940213",
    appId: "1:651290940213:web:47f2feb427935823c5f27c"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export {auth, db, storage}

