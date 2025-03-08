<template>
  <section class="hero">
    <div class="hero-content">
      <h1 class="main-title">{{ heroData.title }}</h1>
      <p class="subtitle">{{ heroData.subtitle }}</p>
      <div class="cta-buttons">
        <router-link to="/services" class="btn primary">บริการของเรา</router-link>
        <router-link to="/contact" class="btn secondary">ติดต่อเรา</router-link>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <span>Scroll Down</span>
      <div class="arrow">↓</div>
    </div>
    
    <!-- 3D Animated Background -->
    <div id="three-container"></div>
  </section>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'HeroSection',
  computed: {
    heroData() {
      return this.$store.getters.getHeroSection || {
        title: 'CYBER BRAND',
        subtitle: "Shaping Tomorrow's Digital Landscape"
      };
    }
  },
  mounted() {
    this.initThreeJS();
  },
  methods: {
    initThreeJS() {
      try {
        // Create scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        const container = document.getElementById('three-container');
        if (container) {
          container.appendChild(renderer.domElement);
        }

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
      } catch (error) {
        console.error('Error initializing ThreeJS:', error);
      }
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>