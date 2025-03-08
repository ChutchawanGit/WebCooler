<!-- Navbar.vue -->
<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <router-link to="/" class="logo">
        <span class="logo-text">Cyber<span class="highlight">Brand</span></span>
      </router-link>
      
      <div class="nav-toggle" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      
      <ul class="nav-links" :class="{ 'nav-active': isMenuOpen }">
        <li><router-link to="/" @click="closeMenu">หน้าแรก</router-link></li>
        <li><router-link to="/services" @click="closeMenu">บริการของเรา</router-link></li>
        <li><router-link to="/work" @click="closeMenu">ผลงาน</router-link></li>
        <li><router-link to="/about" @click="closeMenu">เกี่ยวกับเรา</router-link></li>
        <li><router-link to="/contact" @click="closeMenu">ติดต่อ</router-link></li>
        <li v-if="isAdminMode && isAdmin"><router-link to="/admin" class="admin-link" @click="closeMenu">จัดการเว็บไซต์</router-link></li>
      </ul>
      
      <!-- แสดงปุ่ม Login/Logout เฉพาะเมื่ออยู่ในโหมด Admin -->
      <div class="auth-buttons" v-if="isAdminMode">
        <button v-if="isAuthenticated" @click="handleLogout" class="btn-logout">
          <i class="fas fa-sign-out-alt"></i> ออกจากระบบ
        </button>
        <router-link v-else to="/login" class="btn-login">
          <i class="fas fa-user"></i> เข้าสู่ระบบ
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import authService from '../auth/authService';

export default {
  name: 'SiteNavbar',
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin() {
      return this.$store.getters.isAdminUser;
    },
    userData() {
      return this.$store.getters.userData;
    },
    // เช็คว่าอยู่ในโหมด Admin หรือไม่
    isAdminMode() {
      return this.$route.path.includes('/admin') || this.$route.path.includes('/login');
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 50) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Prevent scrolling when menu is open
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    closeMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    },
    handleLogout() {
      this.$store.dispatch('logout');
      
      // Redirect to home page
      if (this.$route.path.includes('/admin')) {
        this.$router.push('/');
      } else {
        // Close mobile menu if open
        this.isMenuOpen = false;
        document.body.style.overflow = '';
        
        // แจ้งเตือนว่าออกจากระบบสำเร็จ
        alert('ออกจากระบบเรียบร้อยแล้ว');
      }
    }
  }
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 0;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: rgba(12, 12, 12, 0.5);
  backdrop-filter: blur(10px);
}

.navbar-scrolled {
  background-color: rgba(10, 10, 10, 0.95);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 10px 0;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.logo-text {
  display: inline-block;
  letter-spacing: 1px;
}

.highlight {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0 15px;
}

.nav-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  transition: all 0.3s ease;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: white;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

.admin-link {
  color: #6a11cb !important;
  font-weight: 600;
}

.admin-link:hover {
  color: #2575fc !important;
}

.auth-buttons {
  display: flex;
  align-items: center;
}

.btn-login,
.btn-logout {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  border: none;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-login:hover,
.btn-logout:hover {
  transform: translateY(-2px);
}

.btn-login i,
.btn-logout i {
  margin-right: 5px;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.nav-toggle .bar {
  width: 100%;
  height: 3px;
  background-color: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 992px) {
  .nav-toggle {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: 80%;
    max-width: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #0a0a0a;
    transition: all 0.5s ease;
    z-index: 999;
  }
  
  .nav-links.nav-active {
    right: 0;
  }
  
  .nav-links li {
    margin: 15px 0;
  }
  
  .nav-links a {
    font-size: 1.2rem;
  }
  
  .auth-buttons {
    position: absolute;
    top: 25px;
    right: 70px;
  }
}

@media (max-width: 480px) {
  .auth-buttons {
    right: 65px;
  }
  
  .btn-login,
  .btn-logout {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>