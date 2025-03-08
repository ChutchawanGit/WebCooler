<template>
  <div id="app">
    <Navbar />
    <div class="page-transition-wrapper">
      <router-view />
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
  },
  created() {
    // Initialize auth state
    this.$store.dispatch('checkAuth');
    
    // Load site content
    this.$store.dispatch('loadSiteContent');
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', 'Arial', sans-serif;
  line-height: 1.6;
  color: #ffffff;
  background-color: #121212;
  overflow-x: hidden;
}

.page-transition-wrapper {
  padding-top: 70px; /* ให้ space สำหรับ navbar */
}
</style>