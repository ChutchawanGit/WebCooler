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
  name: 'SiteFooter',
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
      this.showScrollTop = window.pageYOffset > 500;
    }
  }
};
</script>

<style scoped>
/* CSS สำหรับ component ที่ไม่อยู่ใน global styles */
.footer {
  background-color: #0a0a0a;
  padding: 80px 0 30px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 60px;
}

.footer-brand {
  flex: 1 1 300px;
  margin-bottom: 30px;
}

.footer-brand h3 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-links {
  flex: 1 1 500px;
  display: flex;
  justify-content: space-around;
}

.link-group h4 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: white;
}

.link-group ul {
  list-style: none;
}

.link-group li {
  margin-bottom: 10px;
}

.link-group a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: #6a11cb;
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
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

.highlight {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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

.footer-nav {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 10px;
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
  .footer-content {
    flex-direction: column;
  }
  
  .footer-links {
    margin-top: 30px;
    flex-wrap: wrap;
  }
  
  .link-group {
    flex: 1 1 200px;
    margin-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .footer-links {
    flex-direction: column;
  }
  
  .footer-nav {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>