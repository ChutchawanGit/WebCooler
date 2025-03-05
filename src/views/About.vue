<template>
    <div class="about">
      <AboutSection />
    </div>
  </template>
  
  <script>
  // ใช้ relative path แทน alias '@'
  import AboutSection from '../components/AboutSection.vue';
  
  export default {
    name: 'AboutPage',
    components: {
      AboutSection
    }
  };
  </script>