import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvzqPoEyCACIYQzF67TsVuqzwekO5JR0Q",
  authDomain: "event-ticket-system.firebaseapp.com",
  projectId: "event-ticket-system",
  storageBucket: "event-ticket-system.appspot.com",
  messagingSenderId: "520091996718",
  appId: "1:520091996718:web:b0d7d19eabd10fb3cb45bf",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
