<template>
    <section id="services" class="section services-section">
      <div class="container">
        <h2 class="section-title">Our Services</h2>
        <div class="services-grid">
          <div class="service-card" v-for="(service, index) in services" :key="index">
            <div class="service-icon" :class="service.iconClass">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ServicesSection',
    data() {
      return {
        services: [
          { 
            title: 'Web Development', 
            description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
            icon: 'fas fa-code',
            iconClass: 'web'
          },
          { 
            title: 'UI/UX Design', 
            description: 'User-centered design that creates engaging and intuitive digital experiences.',
            icon: 'fas fa-paint-brush',
            iconClass: 'design'
          },
          { 
            title: 'Mobile Development', 
            description: 'Native and cross-platform mobile applications for iOS and Android.',
            icon: 'fas fa-mobile-alt',
            iconClass: 'mobile'
          },
          { 
            title: 'Digital Marketing', 
            description: 'Strategic marketing solutions to boost your online presence and drive growth.',
            icon: 'fas fa-chart-line',
            iconClass: 'marketing'
          }
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
  
  .services-section {
    background-color: #0c0c0c;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  .service-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
  }
  
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(106, 17, 203, 0.3);
  }
  
  .service-icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }
  
  .service-icon.web {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
  }
  
  .service-icon.design {
    background: linear-gradient(135deg, #fc6076, #ff9a44);
  }
  
  .service-icon.mobile {
    background: linear-gradient(135deg, #00c6fb, #005bea);
  }
  
  .service-icon.marketing {
    background: linear-gradient(135deg, #f093fb, #f5576c);
  }
  
  .service-card h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: white;
  }
  
  .service-card p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
  }
  
  @media (max-width: 768px) {
    .section {
      padding: 70px 0;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 480px) {
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>