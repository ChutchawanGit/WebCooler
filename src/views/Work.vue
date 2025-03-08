<template>
  <div class="work-page">
    <WorkSection />
  </div>
</template>

<script>
import WorkSection from '../components/WorkSection.vue';

export default {
  name: 'WorkPage',
  components: {
    WorkSection
  }
};
</script>

<style scoped>
.work-page {
  min-height: calc(100vh - 70px);
}
</style>