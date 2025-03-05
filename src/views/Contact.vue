<template>
    <div class="contact">
      <ContactSection />
    </div>
  </template>
  
  <script>
  // ใช้ relative path แทน alias '@'
  import ContactSection from '../components/ContactSection.vue';
  
  export default {
    name: 'ContactPage',
    components: {
      ContactSection
    }
  };
  </script>