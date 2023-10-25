// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHHKvqpiUYfrhZmm1tI8pqiq5I3K6pQ-U",
  authDomain: "hackaton3-db4ed.firebaseapp.com",
  projectId: "hackaton3-db4ed",
  storageBucket: "hackaton3-db4ed.appspot.com",
  messagingSenderId: "155400840442",
  appId: "1:155400840442:web:73947d00c54e690f1fd543",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
