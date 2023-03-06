// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCinIggTeU5LL1_uRBtB5tIfAWWLvmYk1I",
  authDomain: "songapp-e0145.firebaseapp.com",
  projectId: "songapp-e0145",
  storageBucket: "songapp-e0145.appspot.com",
  messagingSenderId: "578887088792",
  appId: "1:578887088792:web:52a555055752ee306feeed",
  measurementId: "G-RPKXL9RWTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);