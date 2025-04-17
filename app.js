// Initialize Firebase (if needed)
import { auth } from './firebaseauth.js';
import { db } from './firebasefirestore.js';

// Common functions for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Update navbar based on auth state
  updateNavbar();
  
  // Initialize cart count
  updateCartCount();
});

function updateNavbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const userGreeting = document.getElementById('userGreeting');
  
  if (user && userGreeting) {
    userGreeting.textContent = `Hi, ${user.displayName}`;
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElements = document.querySelectorAll('.cart-count');
  
  cartCountElements.forEach(element => {
    element.textContent = totalItems;
  });
}

// Common function to show toast messages
window.showToast = (message, isSuccess = true) => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-4 right-4 ${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white p-4 rounded-lg shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 flex items-center`;
  toast.innerHTML = `
    <i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.remove('translate-y-20', 'opacity-0');
  }, 50);
  
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};