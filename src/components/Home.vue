<template>
    <div class="home">
      <div class="container mt-5">
        <h1 class="text-center">Welcome to My Vue Project</h1>
        <p class="text-center">This is a modern and beautiful web page.</p>
        <div class="text-center">
          <button class="btn btn-primary" @click="showAlert">Get Started</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage', // ใช้ชื่อ multi-word เพื่อหลีกเลี่ยงข้อผิดพลาด ESLint
    methods: {
      showAlert() {
        alert('Hello! Welcome to my Vue.js project.');
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
  }
  
  h1 {
    color: #2c3e50;
  }
  </style>