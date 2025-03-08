<template>
  <section class="section about-section">
    <div class="parallax-bg"></div>
    <div class="container">
      <div class="about-content">
        <h2 class="section-title" v-scroll-animate>About Our Vision</h2>
        <p class="lead-text" v-scroll-animate="{ delay: 150 }">We combine cutting-edge technology with creative innovation to deliver exceptional digital experiences.</p>
        <p v-scroll-animate="{ delay: 300 }">Our team of experts is dedicated to pushing the boundaries of what's possible in the digital realm. With a focus on quality, performance, and user experience, we create solutions that not only meet but exceed expectations.</p>
        <div class="stats-container">
          <div 
            class="stat-item" 
            v-for="(stat, index) in stats" 
            :key="index"
            v-scroll-animate="{ delay: 450 + (index * 150), type: 'fade-up' }"
          >
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      stats: [
        { value: '200+', label: 'Clients' },
        { value: '350+', label: 'Projects' },
        { value: '15+', label: 'Awards' },
        { value: '8+', label: 'Years Experience' }
      ]
    };
  }
};
</script>

<style scoped>
.section {
  padding: 100px 0;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

.about-section {
  position: relative;
}

.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1a1a1a;
  opacity: 0.5;
  z-index: -1;
}

.about-content {
  padding: 50px;
  background: rgba(12, 12, 12, 0.85);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.lead-text {
  font-size: 1.5rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.stat-item {
  text-align: center;
  padding: 20px;
  flex: 1;
  min-width: 140px;
}

.stat-number {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .section {
    padding: 70px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .stat-item {
    min-width: 120px;
    padding: 15px 10px;
  }
  
  .stat-number {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .about-content {
    padding: 30px;
  }
  
  .lead-text {
    font-size: 1.2rem;
  }
  
  .stat-item {
    flex: 0 0 calc(50% - 20px);
    margin-bottom: 20px;
  }
}
</style>