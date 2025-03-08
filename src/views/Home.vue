<template>
  <div>
    <HeroSection />
    <ServicesSection />
    <WorkSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue';
import ServicesSection from '../components/ServicesSection.vue';
import AboutSection from '../components/AboutSection.vue';
import WorkSection from '../components/WorkSection.vue';
import ContactSection from '../components/ContactSection.vue';
import { mapGetters } from 'vuex';  // เพิ่มบรรทัดนี้

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters('content', ['getContent']),
    hero() {
      return this.getContent?.hero || {};
    },
    services() {
      return this.getContent?.services || [];
    }
  },
  created() {
    this.$store.dispatch('content/fetchContent');
  },
  components: {
    HeroSection,
    ServicesSection,
    AboutSection,
    WorkSection,
    ContactSection,
  },
  mounted() {
    // โหลดข้อมูลเนื้อหาเว็บไซต์เมื่อ component ถูกโหลด
    this.$store.dispatch('loadSiteContent');
  }
};
</script>