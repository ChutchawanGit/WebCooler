<template>
    <div class="navbar-wrapper" :class="{ 'navbar-hidden': isHidden }">
      <nav class="navbar">
        <div class="logo" @click="goToHome">
          <span class="logo-text">Cyber<span class="highlight">Brand</span></span>
        </div>
        <div class="menu-toggle" @click="toggleMobileMenu">
          <div class="hamburger" :class="{ 'active': mobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <ul class="nav-links" :class="{ 'mobile-active': mobileMenuOpen }">
          <li v-for="(link, index) in navLinks" :key="index">
            <router-link :to="link.path" @click="mobileMenuOpen = false">
              {{ link.name }}
            </router-link>
          </li>
          <li class="contact-button">
            <router-link to="/contact" class="btn-contact" @click="mobileMenuOpen = false">
              ติดต่อเรา
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        lastScrollPosition: 0,
        isHidden: false,
        mobileMenuOpen: false,
        navLinks: [
          { name: 'หน้าแรก', path: '/' },
          { name: 'บริการ', path: '/services' },
          { name: 'ผลงาน', path: '/work' },
          { name: 'เกี่ยวกับเรา', path: '/about' }
        ]
      };
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        // ไม่ซ่อน navbar ถ้า mobile menu เปิดอยู่
        if (this.mobileMenuOpen) {
          this.isHidden = false;
          return;
        }
  
        const currentScrollPosition = window.pageYOffset;
        // ซ่อน navbar เมื่อเลื่อนลง แสดงเมื่อเลื่อนขึ้น
        if (currentScrollPosition < 50) {
          // ถ้าอยู่ด้านบนสุด ให้แสดง navbar เสมอ
          this.isHidden = false;
        } else if (currentScrollPosition > this.lastScrollPosition) {
          // เลื่อนลง -> ซ่อน
          this.isHidden = true;
        } else {
          // เลื่อนขึ้น -> แสดง
          this.isHidden = false;
        }
        this.lastScrollPosition = currentScrollPosition;
      },
      toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        if (this.mobileMenuOpen) {
          document.body.style.overflow = 'hidden'; // ป้องกันการเลื่อนหน้าเมื่อเมนูเปิด
        } else {
          document.body.style.overflow = ''; // คืนค่าการเลื่อนเมื่อปิดเมนู
        }
      },
      goToHome() {
        this.$router.push('/');
        this.mobileMenuOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: transform 0.4s ease, background-color 0.3s ease;
    background-color: rgba(12, 12, 12, 0.85);
    backdrop-filter: blur(8px);
  }
  
  .navbar-hidden {
    transform: translateY(-100%);
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
    height: 70px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .logo {
    cursor: pointer;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
  
  .logo-text {
    background: linear-gradient(to right, #fff, #ccc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .highlight {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-links li {
    margin: 0 15px;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    position: relative;
    padding: 5px 0;
  }
  
  .nav-links a:hover {
    color: #6a11cb;
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
  
  .nav-links a:hover::after {
    width: 100%;
  }
  
  .btn-contact {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
    transition: all 0.3s ease;
  }
  
  .btn-contact:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(106, 17, 203, 0.5);
    color: white !important;
  }
  
  .btn-contact::after {
    display: none;
  }
  
  .menu-toggle {
    display: none;
    cursor: pointer;
  }
  
  .hamburger {
    width: 30px;
    height: 24px;
    position: relative;
  }
  
  .hamburger span {
    display: block;
    position: absolute;
    height: 3px;
    width: 100%;
    background: white;
    border-radius: 3px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: all 0.3s ease;
  }
  
  .hamburger span:nth-child(1) {
    top: 0;
  }
  
  .hamburger span:nth-child(2) {
    top: 10px;
  }
  
  .hamburger span:nth-child(3) {
    top: 20px;
  }
  
  .hamburger.active span:nth-child(1) {
    top: 10px;
    transform: rotate(135deg);
  }
  
  .hamburger.active span:nth-child(2) {
    opacity: 0;
    left: -60px;
  }
  
  .hamburger.active span:nth-child(3) {
    top: 10px;
    transform: rotate(-135deg);
  }
  
  /* Mobile responsive styling */
  @media screen and (max-width: 768px) {
    .menu-toggle {
      display: block;
      z-index: 1001;
    }
  
    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      width: 80%;
      height: 100vh;
      background: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(10px);
      flex-direction: column;
      justify-content: center;
      gap: 40px;
      transition: all 0.5s ease;
      z-index: 1000;
    }
  
    .nav-links.mobile-active {
      right: 0;
    }
  
    .nav-links li {
      margin: 0;
    }
  
    .nav-links a {
      font-size: 1.5rem;
      display: block;
      padding: 10px;
    }
  
    .contact-button {
      margin-top: 20px;
    }
  }
  </style>