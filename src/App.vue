<template>
  <div id="app">
    <Navbar />
    <div class="page-transition-wrapper">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', 'Prompt', sans-serif;
  color: #ffffff;
  background-color: #0c0c0c;
  overflow-x: hidden;
  line-height: 1.6;
}

.page-transition-wrapper {
  padding-top: 70px; /* ให้ space สำหรับ navbar */
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ปรับปรุง scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6a11cb, #2575fc);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #5c0fb3, #1a66e0);
}

/* Common container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Common section styling */
.section {
  padding: 100px 0;
  position: relative;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
}

/* Common button styles */
.btn {
  display: inline-block;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  outline: none;
}

.btn.primary {
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
}

.btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.5);
}

.btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* Responsive media queries */
@media (max-width: 768px) {
  .section {
    padding: 70px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .btn {
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .btn.secondary {
    margin-left: 0;
    margin-top: 15px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}
</style>