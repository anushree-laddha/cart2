// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIIrO8lZ2lY2p600ko47sYHl-5JAVlugE",
  authDomain: "assign-72a64.firebaseapp.com",
  projectId: "assign-72a64",
  storageBucket: "assign-72a64.appspot.com",
  messagingSenderId: "204596116281",
  appId: "1:204596116281:web:82d98d01389d34e23c06e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Set persistence to session only
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence set to session only");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

// Check authentication state
onAuthStateChanged(auth, (user) => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  if (user) {
    // User is signed in
    const isAuthPage = currentPath === 'index.html';
    
    if (isAuthPage) {
      window.location.href = "home.html";
    }
    
    // Store user info in localStorage
    localStorage.setItem("user", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0],
      photoURL: user.photoURL || null
    }));
    
  } else {
    // User is signed out
    const protectedPages = ['home.html', 'cart.html', 'items.html', 'aboutus.html', 'contactus.html'];
    
    const isProtectedPage = protectedPages.includes(currentPath);
    
    if (isProtectedPage) {
      window.location.href = "index.html";
    }
    
    // Clear user data
    localStorage.removeItem("user");
  }
});

// Export functions for use in HTML
window.signup = async (event) => {
  event.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    window.location.href = "home.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

window.login = async (event) => {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "home.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

window.loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    alert("Google login successful!");
    window.location.href = "home.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

window.logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    window.location.href = "index.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

export { auth };