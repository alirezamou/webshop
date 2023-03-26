import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCu7MEeLH8kSneUJ9be05WNC-BjxkdDRZU",
  authDomain: "webshop-ef5a0.firebaseapp.com",
  projectId: "webshop-ef5a0",
  storageBucket: "webshop-ef5a0.appspot.com",
  messagingSenderId: "1082030892678",
  appId: "1:1082030892678:web:d29b0a3f983e4ce7bbd307",
};

const app = initializeApp(firebaseConfig);
const Firestore = getFirestore(app);

export let FirebaseApp = app;

export default {};
