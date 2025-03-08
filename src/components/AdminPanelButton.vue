<template>
    <div class="admin-panel-button" v-if="isLoggedIn">
      <router-link to="/admin" class="admin-link">
        <i class="fas fa-user-cog"></i>
        <span>แดชบอร์ด</span>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AdminPanelButton',
    computed: {
      isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
      }
    }
  }
  </script>
  
  <style scoped>
  .admin-panel-button {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 999;
  }
  
  .admin-link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
    transition: all 0.3s ease;
  }
  
  .admin-link i {
    margin-right: 8px;
  }
  
  .admin-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(106, 17, 203, 0.5);
  }
  
  @media (max-width: 768px) {
    .admin-panel-button {
      bottom: 20px;
      left: 20px;
    }
  }
  </style>