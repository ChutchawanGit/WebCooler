import store from '../store';

export default function authGuard(to, from, next) {
  // Initialize auth state if needed
  store.dispatch('checkAuth');
  
  const isAuthenticated = store.getters.isLoggedIn;
  const isAdmin = store.getters.isAdminUser;
  
  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      next({ name: 'Login' });
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      // Redirect to home if not an admin
      next({ name: 'Home' });
    } else {
      // Allow access
      next();
    }
  } else {
    // Allow access to non-protected routes
    next();
  }
}