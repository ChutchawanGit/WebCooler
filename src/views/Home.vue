<template>
    <div>
      <!-- Hero Section with Animated Background -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="main-title">CYBER BRAND</h1>
          <p class="subtitle">Shaping Tomorrow's Digital Landscape</p>
          <div class="cta-buttons">
            <button class="btn primary" @click="scrollToSection('services')">Our Services</button>
            <button class="btn secondary" @click="scrollToSection('contact')">Contact Us</button>
          </div>
        </div>
        <div class="scroll-indicator">
          <span>Scroll Down</span>
          <div class="arrow">↓</div>
        </div>
        
        <!-- 3D Animated Background -->
        <div id="three-container"></div>
      </section>
  
      <!-- Services Section -->
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
  
      <!-- About Section with Parallax -->
      <section class="section about-section">
        <div class="parallax-bg"></div>
        <div class="container">
          <div class="about-content">
            <h2 class="section-title">About Our Vision</h2>
            <p class="lead-text">We combine cutting-edge technology with creative innovation to deliver exceptional digital experiences.</p>
            <p>Our team of experts is dedicated to pushing the boundaries of what's possible in the digital realm. With a focus on quality, performance, and user experience, we create solutions that not only meet but exceed expectations.</p>
            <div class="stats-container">
              <div class="stat-item" v-for="(stat, index) in stats" :key="index">
                <div class="stat-number">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Work Showcase -->
      <section class="section work-section">
        <div class="container">
          <h2 class="section-title">Our Work</h2>
          <div class="work-grid">
            <div class="work-item" v-for="(project, index) in projects" :key="index" @click="showProjectDetails(index)">
              <div class="work-image" :style="{ backgroundColor: project.color }">
                <div class="work-overlay">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Contact Section -->
      <section id="contact" class="section contact-section">
        <div class="container">
          <h2 class="section-title">Get In Touch</h2>
          <div class="contact-container">
            <div class="contact-form">
              <form @submit.prevent="submitForm">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" v-model="formData.name" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" v-model="formData.email" required>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" v-model="formData.message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn primary">Send Message</button>
              </form>
            </div>
            <div class="contact-info">
              <div class="info-item">
                <h3>Email</h3>
                <p>contact@cyberbrand.com</p>
              </div>
              <div class="info-item">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div class="info-item">
                <h3>Address</h3>
                <p>123 Digital Avenue<br>Tech City, TC 10010</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import * as THREE from 'three';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  export default {
    name: 'Home',
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
        ],
        stats: [
          { value: '200+', label: 'Clients' },
          { value: '350+', label: 'Projects' },
          { value: '15+', label: 'Awards' },
          { value: '8+', label: 'Years Experience' }
        ],
        projects: [
          { 
            title: 'Neon Finance App', 
            category: 'Mobile App',
            color: '#6a11cb'
          },
          { 
            title: 'EcoTech Platform', 
            category: 'Web Application',
            color: '#005c97'
          },
          { 
            title: 'FutureVision AR', 
            category: 'AR Experience',
            color: '#1e3c72'
          },
          { 
            title: 'Digital City Project', 
            category: 'UI/UX Design',
            color: '#4a00e0'
          },
          { 
            title: 'Smart Home Interface', 
            category: 'IoT Dashboard',
            color: '#8e2de2'
          },
          { 
            title: 'CryptoVault', 
            category: 'Blockchain App',
            color: '#614385'
          }
        ],
        formData: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    mounted() {
      this.initThreeJS();
      this.setupScrollAnimations();
    },
    methods: {
      initThreeJS() {
        // Create scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-container').appendChild(renderer.domElement);
  
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);
  
        // Create particles
        const particleCount = 1000;
        const particles = new THREE.BufferGeometry();
        
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
          // Position
          positions[i] = (Math.random() - 0.5) * 50;
          positions[i + 1] = (Math.random() - 0.5) * 50;
          positions[i + 2] = (Math.random() - 0.5) * 50;
          
          // Color
          colors[i] = Math.random() * 0.5 + 0.5; // R: purple range
          colors[i + 1] = Math.random() * 0.2; // G: low for purple
          colors[i + 2] = Math.random() * 0.5 + 0.5; // B: purple range
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
          size: 0.1,
          vertexColors: true,
          transparent: true,
          opacity: 0.8
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        scene.add(particleSystem);
  
        // Camera position
        camera.position.z = 30;
  
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          
          particleSystem.rotation.x += 0.0005;
          particleSystem.rotation.y += 0.0007;
          
          renderer.render(scene, camera);
        };
        
        animate();
  
        // Handle window resize
        window.addEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      },
      setupScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);
  
        // Animate section titles
        gsap.utils.toArray('.section-title').forEach((title) => {
          gsap.from(title, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
              trigger: title,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        });
  
        // Animate service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: '.services-grid',
              start: 'top 70%',
            },
          });
        });
  
        // Animate work items
        gsap.utils.toArray('.work-item').forEach((item, i) => {
          gsap.from(item, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: '.work-grid',
              start: 'top 70%',
            },
          });
        });
  
        // Animate stats
        gsap.utils.toArray('.stat-item').forEach((stat, i) => {
          gsap.from(stat, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: '.stats-container',
              start: 'top 80%',
            },
          });
        });
      },
      scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      },
      showProjectDetails(index) {
        alert(`Project details for: ${this.projects[index].title}`);
        // In a real implementation, you might open a modal with project details
      },
      submitForm() {
        // Here you would typically send the form data to your backend
        alert('Form submitted successfully!');
        console.log('Form data:', this.formData);
        // Reset form
        this.formData = {
          name: '',
          email: '',
          message: ''
        };
      }
    }
  };
  </script>