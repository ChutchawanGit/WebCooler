<template>
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
  </template>
  
  <script>
  import * as THREE from 'three';
  
  export default {
    name: 'HeroSection',
    mounted() {
      this.initThreeJS();
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
      scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Hero Section Styles */
  .hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(26, 26, 29, 0.8) 0%, rgba(26, 26, 29, 0.9) 100%);
  }
  
  .hero-content {
    text-align: center;
    z-index: 2;
    max-width: 800px;
    padding: 0 20px;
  }
  
  .main-title {
    font-size: 5rem;
    font-weight: 800;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: glow 2s infinite alternate;
  }
  
  .subtitle {
    font-size: 1.8rem;
    margin-bottom: 40px;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .cta-buttons {
    margin-top: 30px;
  }
  
  .btn {
    display: inline-block;
    padding: 12px 28px;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border: none;
    border-radius: 50px;
    transition: all 0.3s ease;
    outline: none;
  }
  
  .btn.primary {
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(106, 17, 203, 0.4);
  }
  
  .btn.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(106, 17, 203, 0.5);
  }
  
  .btn.secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    margin-left: 15px;
  }
  
  .btn.secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    z-index: 2;
  }
  
  .arrow {
    font-size: 1.5rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px);
    }
  }
  
  #three-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  @keyframes glow {
    from {
      text-shadow: 0 0 10px rgba(106, 17, 203, 0.5),
                   0 0 20px rgba(106, 17, 203, 0.3),
                   0 0 30px rgba(106, 17, 203, 0.2);
    }
    to {
      text-shadow: 0 0 15px rgba(106, 17, 203, 0.8),
                   0 0 25px rgba(106, 17, 203, 0.5),
                   0 0 35px rgba(106, 17, 203, 0.3);
    }
  }
  
  /* Media Queries */
  @media (max-width: 768px) {
    .main-title {
      font-size: 3.5rem;
    }
    
    .subtitle {
      font-size: 1.3rem;
    }
    
    .btn {
      padding: 10px 20px;
    }
  }
  
  @media (max-width: 480px) {
    .main-title {
      font-size: 2.8rem;
    }
    
    .btn.secondary {
      margin-left: 0;
      margin-top: 15px;
    }
    
    .cta-buttons {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
  </style>