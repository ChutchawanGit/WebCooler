<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>Cyber<span class="highlight">Brand</span></h3>
            <p>สร้างสรรค์นวัตกรรมเพื่ออนาคต</p>
            <div class="social-icons">
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="social-icon" target="_blank">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>เกี่ยวกับบริษัท</h4>
              <ul>
                <li><router-link to="/about">เกี่ยวกับเรา</router-link></li>
                <li><router-link to="/services">บริการ</router-link></li>
                <li><router-link to="/work">ผลงาน</router-link></li>
                <li><router-link to="/contact">ติดต่อเรา</router-link></li>
              </ul>
            </div>
            <div class="link-group">
              <h4>บริการของเรา</h4>
              <ul>
                <li><a href="#">เว็บไซต์</a></li>
                <li><a href="#">แอพพลิเคชั่น</a></li>
                <li><a href="#">กราฟิกดีไซน์</a></li>
                <li><a href="#">การตลาดดิจิทัล</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4>ติดต่อเรา</h4>
              <ul class="contact-info">
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  <span>123 ถนนดิจิทัล, กรุงเทพฯ 10110</span>
                </li>
                <li>
                  <i class="fas fa-phone-alt"></i>
                  <span>+66 2 123 4567</span>
                </li>
                <li>
                  <i class="fas fa-envelope"></i>
                  <span>contact@cyberbrand.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ new Date().getFullYear() }} Cyber Brand. สงวนลิขสิทธิ์ทั้งหมด.</p>
          <div class="footer-nav">
            <a href="#">นโยบายความเป็นส่วนตัว</a>
            <a href="#">เงื่อนไขการให้บริการ</a>
          </div>
        </div>
      </div>
      <button class="scroll-to-top" @click="scrollToTop" :class="{ 'visible': showScrollTop }">
        <i class="fas fa-chevron-up"></i>
      </button>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        showScrollTop: false
      };
    },
    mounted() {
      window.addEventListener('scroll', this.toggleScrollToTop);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.toggleScrollToTop);
    },
    methods: {
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      toggleScrollToTop() {
        if (window.pageYOffset > 500) {
          this.showScrollTop = true;
        } else {
          this.showScrollTop = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #0a0a0a;
    padding: 80px 0 30px;
    position: relative;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  
  .footer-brand {
    flex: 1 1 300px;
    margin-bottom: 30px;
  }
  
  .footer-brand h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: white;
  }
  
  .highlight {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .footer-brand p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
  }
  
  .social-icons {
    display: flex;
    gap: 15px;
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    color: white;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    transform: translateY(-3px);
  }
  
  .footer-links {
    flex: 1 1 600px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .link-group {
    margin-bottom: 30px;
    min-width: 180px;
  }
  
  .link-group h4 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: white;
    position: relative;
    padding-bottom: 10px;
  }
  
  .link-group h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
  }
  
  .link-group ul {
    list-style: none;
  }
  
  .link-group li {
    margin-bottom: 10px;
  }
  
  .link-group a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .link-group a:hover {
    color: #6a11cb;
  }
  
  .contact-info li {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }
  
  .contact-info i {
    margin-right: 10px;
    margin-top: 5px;
    color: #6a11cb;
  }
  
  .footer-bottom {
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }
  
  .footer-nav {
    display: flex;
    gap: 20px;
  }
  
  .footer-nav a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-nav a:hover {
    color: #6a11cb;
  }
  
  .scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
    z-index: 999;
  }
  
  .scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
  }
  
  .scroll-to-top:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(106, 17, 203, 0.5);
  }
  
  @media (max-width: 768px) {
    .footer {
      padding: 60px 0 30px;
    }
  
    .footer-content {
      flex-direction: column;
    }
  
    .footer-links {
      margin-top: 30px;
      justify-content: flex-start;
      gap: 40px;
    }
  
    .footer-bottom {
      flex-direction: column;
      text-align: center;
      gap: 15px;
    }
  }
  
  @media (max-width: 480px) {
    .link-group {
      min-width: 140px;
    }
  
    .scroll-to-top {
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
    }
  }
  </style>