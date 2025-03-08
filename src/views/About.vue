<template>
  <div class="about-page">
    <AboutSection />
  </div>
</template>

<script>
import AboutSection from '../components/AboutSection.vue';

export default {
  name: 'AboutPage',
  components: {
    AboutSection
  }
};
</script>

<style scoped>
.about-page {
  min-height: calc(100vh - 70px);
}
</style>