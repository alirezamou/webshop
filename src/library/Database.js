import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";

import moment from "moment";

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

export default {
  add_product(product) {
    const productsRef = collection(Firestore, "products");
    return addDoc(productsRef, product);
  },
  save_product(id, product) {
    const productsRef = collection(Firestore, "products");
    return setDoc(doc(productsRef, id), product);
  },
  delete_product(id) {
    const productsRef = collection(Firestore, "products");
    return deleteDoc(doc(productsRef, id));
  },
  get_products() {
    const productsRef = collection(Firestore, "products");
    return getDocs(productsRef);
  },
  get_product(id) {
    return getDoc(doc(collection(Firestore, "products"), id));
  },
  add_order(order) {
    if (order.timestamp === undefined) {
      order.timestamp = moment().format();
    }
    const ordersRef = collection(Firestore, "orders");
    return addDoc(ordersRef, order);
  },
};
