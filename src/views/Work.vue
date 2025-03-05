<template>
    <div class="work">
      <WorkSection />
    </div>
  </template>
  
  <script>
  // ใช้ relative path แทน alias '@'
  import WorkSection from '../components/WorkSection.vue';
  
  export default {
    name: 'WorkPage',
    components: {
      WorkSection
    }
  };
  </script>