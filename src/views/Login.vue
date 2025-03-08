<template>
  <div class="login-page">
    <div class="container">
      <div class="login-container">
        <div class="login-header">
          <h1>เข้าสู่ระบบ</h1>
          <p>เข้าสู่ระบบเพื่อจัดการเว็บไซต์ของคุณ</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">ชื่อผู้ใช้</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              placeholder="กรอกชื่อผู้ใช้"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="password">รหัสผ่าน</label>
            <div class="password-input">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="password" 
                placeholder="กรอกรหัสผ่าน"
                required
              >
              <button 
                type="button" 
                class="toggle-password" 
                @click="togglePassword"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>
          
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          
          <button type="submit" class="login-btn">
            <i class="fas fa-sign-in-alt"></i> เข้าสู่ระบบ
          </button>
          
          <div class="back-link">
            <router-link to="/">
              <i class="fas fa-arrow-left"></i> กลับไปหน้าหลัก
            </router-link>
          </div>
        </form>
        
        <div class="login-info">
          <div class="info-item">
            <strong>Admin Account:</strong> 
            <p>Username: admin / Password: admin123</p>
          </div>
          <div class="info-item">
            <strong>User Account:</strong>
            <p>Username: user / Password: user123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import authService from '../auth/authService';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      errorMessage: ''
    };
  },
  created() {
    // If already logged in, redirect to appropriate page
    if (this.$store.getters.isLoggedIn) {
      if (this.$store.getters.isAdminUser) {
        this.$router.push('/admin');
      } else {
        this.$router.push('/');
      }
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleLogin() {
      // เรียกใช้ authService โดยตรง
      if (authService.login(this.username, this.password)) {
        this.errorMessage = '';
        
        // อัพเดทสถานะใน store
        this.$store.dispatch('checkAuth');
        
        // Redirect based on user role
        if (authService.isAdmin()) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/');
        }
      } else {
        this.errorMessage = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
}

.login-container {
  background-color: rgba(24, 24, 24, 0.8);
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-header p {
  color: rgba(255, 255, 255, 0.7);
}

.login-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #6a11cb;
  box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
}

.password-input {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  color: white;
}

.error-message {
  color: #ff6b6b;
  margin-bottom: 20px;
  padding: 10px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 5px;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn i {
  margin-right: 8px;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.5);
}

.back-link {
  text-align: center;
  margin-top: 20px;
}

.back-link a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.back-link a:hover {
  color: #6a11cb;
}

.back-link i {
  margin-right: 5px;
}

.login-info {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.info-item {
  margin-bottom: 10px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.info-item strong {
  color: rgba(255, 255, 255, 0.9);
}

.info-item p {
  margin: 5px 0 0;
}

@media (max-width: 600px) {
  .login-container {
    padding: 30px 20px;
  }
  
  .login-header h1 {
    font-size: 1.8rem;
  }
}
</style>