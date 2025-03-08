<template>
  <div class="services-page">
    <ServicesSection />
  </div>
</template>

<script>
import ServicesSection from '../components/ServicesSection.vue';

export default {
  name: 'ServicesPage',
  components: {
    ServicesSection
  }
};
</script>

<style scoped>
.services-page {
  min-height: calc(100vh - 70px);
}
</style>