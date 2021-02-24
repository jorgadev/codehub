import firebase from "firebase/app";
import "firebase/auth";

// Create firebase app
const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyD3kMPkLd4lKIGI1oi3qJoA5JAlF5Dcsk0",
  authDomain: "codehub-d9f87.firebaseapp.com",
  projectId: "codehub-d9f87",
  storageBucket: "codehub-d9f87.appspot.com",
  messagingSenderId: "919828340180",
  appId: "1:919828340180:web:a1a85aed78d3381ae74a41",
});

// Gives authentication instance
export const auth = app.auth();

export default app;
