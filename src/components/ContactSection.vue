<template>
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
  </template>
  
  <script>
  export default {
    name: 'ContactSection',
    data() {
      return {
        formData: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
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
  
  .contact-section {
    background: linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 100%);
  }
  
  .contact-container {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
  }
  
  .contact-form {
    flex: 1 1 500px;
    background: rgba(255, 255, 255, 0.03);
    padding: 40px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .contact-info {
    flex: 1 1 300px;
  }
  
  .form-group {
    margin-bottom: 25px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
  }
  
  .info-item {
    margin-bottom: 35px;
  }
  
  .info-item h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .info-item p {
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
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
  
  @media (max-width: 768px) {
    .section {
      padding: 70px 0;
    }
    
    .section-title {
      font-size: 2rem;
    }
    
    .contact-container {
      flex-direction: column;
    }
    
    .btn {
      padding: 10px 20px;
    }
  }
  
  @media (max-width: 480px) {
    .btn.primary {
      width: 100%;
    }
  }
  </style>