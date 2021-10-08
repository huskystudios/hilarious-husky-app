import React from 'react'
import { initializeApp } from "firebase/app";
import "firebase/database";
import "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC689GHadiqOX98jk1916dMOsdZKnx0b0Q",
  authDomain: "hilarioushuskies-17a46.firebaseapp.com",
  databaseURL: "https://hilarioushuskies-17a46-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "hilarioushuskies-17a46",
  storageBucket: "hilarioushuskies-17a46.appspot.com",
  messagingSenderId: "684755851777",
  appId: "1:684755851777:web:23d9be393953cc5173be00",
  measurementId: "G-WMYVFMKWVP"
  };


  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const analytics = getAnalytics(app);

export { app, db, analytics }
