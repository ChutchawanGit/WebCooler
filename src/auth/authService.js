// src/auth/authService.js
const AUTH_KEY = 'isLoggedIn';
const ADMIN_KEY = 'isAdmin';
const USER_DATA = 'userData';

export default {
  // Login user
  login(username, password) {
    // In a real app, you would validate credentials against a backend API
    // For this demo, we'll use a simple check
    if (username === 'admin' && password === 'admin123') {
      const userData = {
        username: 'admin',
        displayName: 'Administrator',
        role: 'admin'
      };
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(ADMIN_KEY, 'true');
      localStorage.setItem(USER_DATA, JSON.stringify(userData));
      return true;
    } else if (username === 'user' && password === 'user123') {
      const userData = {
        username: 'user',
        displayName: 'Standard User',
        role: 'user'
      };
      localStorage.setItem(AUTH_KEY, 'true');
      localStorage.setItem(ADMIN_KEY, 'false');
      localStorage.setItem(USER_DATA, JSON.stringify(userData));
      return true;
    }
    return false;
  },

  // Logout user
  logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(USER_DATA);
  },

  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  // Check if user is admin
  isAdmin() {
    return localStorage.getItem(ADMIN_KEY) === 'true';
  },
  
  // Get current user data
  getUserData() {
    const userData = localStorage.getItem(USER_DATA);
    return userData ? JSON.parse(userData) : null;
  }
};