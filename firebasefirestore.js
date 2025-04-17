import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

// Initialize Firebase (using same config as auth)
const firebaseConfig = {
  apiKey: "AIzaSyAIIrO8lZ2lY2p600ko47sYHl-5JAVlugE",
  authDomain: "assign-72a64.firebaseapp.com",
  projectId: "assign-72a64",
  storageBucket: "assign-72a64.appspot.com",
  messagingSenderId: "204596116281",
  appId: "1:204596116281:web:82d98d01389d34e23c06e8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a product to Firestore
window.addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, "products"), product);
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding product: ", e);
    throw e;
  }
};

// Function to get all products from Firestore
window.getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (e) {
    console.error("Error getting products: ", e);
    throw e;
  }
};

// Function to save user's cart
window.saveCart = async (userId, cartItems) => {
  try {
    await setDoc(doc(db, "carts", userId), {
      items: cartItems,
      updatedAt: new Date()
    });
    console.log("Cart saved successfully");
  } catch (e) {
    console.error("Error saving cart: ", e);
    throw e;
  }
};

// Function to get user's cart
window.getCart = async (userId) => {
  try {
    const docRef = doc(db, "carts", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().items;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error getting cart: ", e);
    throw e;
  }
};

export { db };