<template>
  <div class="admin-dashboard" v-if="content"> <!-- เพิ่ม v-if ที่นี่ -->
    <div class="sidebar">
        <div class="logo">
          <span class="logo-text">Cyber<span class="highlight">Brand</span> Admin</span>
        </div>
        <ul class="nav-menu">
          <li v-for="(item, index) in menuItems" :key="index" 
              :class="{ active: activeTab === item.id }" 
              @click="setActiveTab(item.id)">
            <i :class="item.icon"></i> {{ item.name }}
          </li>
        </ul>
        <div class="admin-footer">
          <button class="btn-logout" @click="logout">
            <i class="fas fa-sign-out-alt"></i> ออกจากระบบ
          </button>
        </div>
      </div>
      
      <div class="main-content">
        <div class="header">
          <h1>{{ getCurrentTabName() }}</h1>
          <div class="actions">
            <button class="btn save" @click="saveChanges" v-if="hasChanges">
              <i class="fas fa-save"></i> บันทึก
            </button>
          </div>
        </div>
        
        <div class="content-area">
          <!-- ส่วนจัดการหน้าแรก -->
          <div v-if="activeTab === 'home'" class="tab-content">
            <section class="edit-section">
              <h2>Hero Section</h2>
              <div class="form-group">
                <label>Main Title</label>
                <input type="text" v-model="content.hero.title">
              </div>
              <div class="form-group">
                <label>Subtitle</label>
                <input type="text" v-model="content.hero.subtitle">
              </div>
            </section>
            
            <section class="edit-section">
              <h2>Services</h2>
              <div class="service-items sortable-list">
                <div v-for="(service, index) in content.services" :key="index" class="sortable-item">
                  <div class="item-header">
                    <h3>Service #{{ index + 1 }}</h3>
                    <div class="item-actions">
                      <button @click="moveItem(content.services, index, index - 1)" 
                              :disabled="index === 0" class="btn-icon">
                        <i class="fas fa-arrow-up"></i>
                      </button>
                      <button @click="moveItem(content.services, index, index + 1)" 
                              :disabled="index === content.services.length - 1" class="btn-icon">
                        <i class="fas fa-arrow-down"></i>
                      </button>
                      <button @click="removeItem(content.services, index)" class="btn-icon delete">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" v-model="service.title">
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea v-model="service.description" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Icon</label>
                    <select v-model="service.icon">
                      <option value="fas fa-code">Code</option>
                      <option value="fas fa-paint-brush">Design</option>
                      <option value="fas fa-mobile-alt">Mobile</option>
                      <option value="fas fa-chart-line">Analytics</option>
                      <option value="fas fa-globe">Web</option>
                      <option value="fas fa-cog">Settings</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Icon Background Color Class</label>
                    <select v-model="service.iconClass">
                      <option value="web">Blue Purple</option>
                      <option value="design">Orange</option>
                      <option value="mobile">Light Blue</option>
                      <option value="marketing">Pink</option>
                    </select>
                  </div>
                </div>
              </div>
              <button @click="addItem('services')" class="btn add">
                <i class="fas fa-plus"></i> Add Service
              </button>
            </section>
          </div>
          
          <!-- ส่วนจัดการโปรเจกต์ -->
          <div v-if="activeTab === 'projects'" class="tab-content">
            <div class="project-items sortable-list">
              <div v-for="(project, index) in content.projects" :key="index" class="sortable-item">
                <div class="item-header">
                  <h3>Project #{{ index + 1 }}</h3>
                  <div class="item-actions">
                    <button @click="moveItem(content.projects, index, index - 1)" 
                            :disabled="index === 0" class="btn-icon">
                      <i class="fas fa-arrow-up"></i>
                    </button>
                    <button @click="moveItem(content.projects, index, index + 1)" 
                            :disabled="index === content.projects.length - 1" class="btn-icon">
                      <i class="fas fa-arrow-down"></i>
                    </button>
                    <button @click="removeItem(content.projects, index)" class="btn-icon delete">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <label>Title</label>
                  <input type="text" v-model="project.title">
                </div>
                <div class="form-group">
                  <label>Category</label>
                  <input type="text" v-model="project.category">
                </div>
                <div class="form-group">
                  <label>Background Color</label>
                  <input type="color" v-model="project.color" class="color-picker">
                </div>
                <div class="form-group">
                  <label>Image</label>
                  <div class="image-upload">
                    <div class="image-preview" v-if="project.image" :style="{ backgroundImage: `url(${project.image})` }"></div>
                    <div class="image-preview empty" v-else>No Image</div>
                    <label class="btn upload-btn">
                      <i class="fas fa-upload"></i> Upload Image
                      <input type="file" accept="image/*" @change="handleImageUpload($event, 'projects', index)" class="hidden-upload">
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button @click="addItem('projects')" class="btn add">
              <i class="fas fa-plus"></i> Add Project
            </button>
          </div>
          
          <!-- ส่วนจัดการเกี่ยวกับเรา -->
          <div v-if="activeTab === 'about'" class="tab-content">
            <section class="edit-section">
              <h2>About Content</h2>
              <div class="form-group">
                <label>Section Title</label>
                <input type="text" v-model="content.about.title">
              </div>
              <div class="form-group">
                <label>Lead Text</label>
                <textarea v-model="content.about.leadText" rows="3"></textarea>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea v-model="content.about.description" rows="5"></textarea>
              </div>
              
              <h3>Statistics</h3>
              <div class="stats-items sortable-list">
                <div v-for="(stat, index) in content.about.stats" :key="index" class="sortable-item">
                  <div class="item-header">
                    <h4>Stat #{{ index + 1 }}</h4>
                    <div class="item-actions">
                      <button @click="moveItem(content.about.stats, index, index - 1)" 
                              :disabled="index === 0" class="btn-icon">
                        <i class="fas fa-arrow-up"></i>
                      </button>
                      <button @click="moveItem(content.about.stats, index, index + 1)" 
                              :disabled="index === content.about.stats.length - 1" class="btn-icon">
                        <i class="fas fa-arrow-down"></i>
                      </button>
                      <button @click="removeItem(content.about.stats, index)" class="btn-icon delete">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Value</label>
                    <input type="text" v-model="stat.value">
                  </div>
                  <div class="form-group">
                    <label>Label</label>
                    <input type="text" v-model="stat.label">
                  </div>
                </div>
              </div>
              <button @click="addItem('stats')" class="btn add">
                <i class="fas fa-plus"></i> Add Stat
              </button>
            </section>
          </div>
          
          <!-- ส่วนจัดการติดต่อ -->
          <div v-if="activeTab === 'contact'" class="tab-content">
            <section class="edit-section">
              <h2>Contact Information</h2>
              <div class="form-group">
                <label>Section Title</label>
                <input type="text" v-model="content.contact.title">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="content.contact.email">
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="text" v-model="content.contact.phone">
              </div>
              <div class="form-group">
                <label>Address</label>
                <textarea v-model="content.contact.address" rows="3"></textarea>
              </div>
            </section>
          </div>
          
          <!-- ส่วนตั้งค่าทั่วไป -->
          <div v-if="activeTab === 'settings'" class="tab-content">
            <section class="edit-section">
              <h2>Site Settings</h2>
              <div class="form-group">
                <label>Site Name</label>
                <input type="text" v-model="content.settings.siteName">
              </div>
              <div class="form-group">
                <label>Footer Text</label>
                <input type="text" v-model="content.settings.footerText">
              </div>
              <div class="form-group">
                <label>Logo</label>
                <div class="image-upload">
                  <div class="image-preview" v-if="content.settings.logo" :style="{ backgroundImage: `url(${content.settings.logo})` }"></div>
                  <div class="image-preview empty" v-else>No Logo</div>
                  <label class="btn upload-btn">
                    <i class="fas fa-upload"></i> Upload Logo
                    <input type="file" accept="image/*" @change="handleLogoUpload" class="hidden-upload">
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label>Social Media Links</label>
                <div class="social-links">
                  <div v-for="(social, index) in content.settings.social" :key="index" class="social-item">
                    <div class="form-group">
                      <label>{{ social.name }}</label>
                      <input type="url" v-model="social.url">
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  /* eslint-disable */


import { resizeAndCompressImage } from '../utils';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { deleteObject, ref as storageRef } from 'firebase/storage';
import { db, storage } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'; // เพิ่ม setDoc


export default {
  name: 'AdminDashboard',
  data() {
    return {
      hasChanges: false,
      originalContent: null,
      content: null,
      loading: false,
      error: null,
      activeTab: 'home',
      menuItems: [ // ย้าย menuItems มาไว้ใน data
        { id: 'home', name: 'หน้าแรก', icon: 'fas fa-home' },
        { id: 'projects', name: 'ผลงาน', icon: 'fas fa-briefcase' },
        { id: 'about', name: 'เกี่ยวกับเรา', icon: 'fas fa-info-circle' },
        { id: 'contact', name: 'ติดต่อ', icon: 'fas fa-envelope' },
        { id: 'settings', name: 'ตั้งค่า', icon: 'fas fa-cog' }
      ]
    }
  },
  watch: {
    // ติดตามการเปลี่ยนแปลงของ content
    content: {
      handler(newVal) {
        if (this.originalContent) {
          this.hasChanges = JSON.stringify(newVal) !== this.originalContent;
        }
      },
      deep: true
    }
  },
  async created() {
    await this.loadContent();
    // เก็บค่าเริ่มต้นเพื่อเปรียบเทียบ
    this.originalContent = JSON.stringify(this.content);
  },
  methods: {
    async loadContent() {
      try {
        this.loading = true;
        const docRef = doc(db, 'site-content', 'main');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          this.content = docSnap.data();
        } else {
          // Initialize with default content
          await this.initializeDefaultContent();
        }
      } catch (error) {
        console.error('Error loading content:', error);
        this.error = 'Failed to load content';
      } finally {
        this.loading = false;
      }
    },
    getCurrentTabName() {
      // เพิ่มการตรวจสอบว่า menuItems มีค่าหรือไม่
      if (!this.menuItems) return '';
      const tab = this.menuItems.find(item => item.id === this.activeTab);
      return tab ? `จัดการ${tab.name}` : '';
    },
    setActiveTab(tabId) {
      this.activeTab = tabId;
    },
    async saveChanges() {
      try {
        this.loading = true;
        const docRef = doc(db, 'site-content', 'main');
        await updateDoc(docRef, this.content);
        this.originalContent = JSON.stringify(this.content);
        this.hasChanges = false;
        alert('บันทึกข้อมูลเรียบร้อยแล้ว');
      } catch (error) {
        console.error('Error saving content:', error);
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      } finally {
        this.loading = false;
      }
    },

    async handleImageUpload(event, type, index) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        this.loading = true;
        
        // Upload to Firebase Storage
        const storageRef = ref(storage, `images/${type}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Delete old image if exists
        if (type === 'projects' && this.content.projects[index].imageUrl) {
          await this.deleteOldImage(this.content.projects[index].imageUrl);
        }

        // Update Firestore
        if (type === 'projects') {
          this.content.projects[index].imageUrl = downloadURL;
          await this.saveChanges();
        }
      } catch (error) {
        console.error('Error handling image:', error);
        alert('เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ');
      } finally {
        this.loading = false;
      }
    },

    async initializeDefaultContent() {
      const defaultContent = {
        hero: {
          title: 'CYBER BRAND',
          subtitle: "Shaping Tomorrow's Digital Landscape"
        },
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
        projects: [
          { 
            title: 'Neon Finance App', 
            category: 'Mobile App',
            color: '#6a11cb',
            image: null
          },
          { 
            title: 'EcoTech Platform', 
            category: 'Web Application',
            color: '#005c97',
            image: null
          },
          { 
            title: 'FutureVision AR', 
            category: 'AR Experience',
            color: '#1e3c72',
            image: null
          },
          { 
            title: 'Digital City Project', 
            category: 'UI/UX Design',
            color: '#4a00e0',
            image: null
          },
          { 
            title: 'Smart Home Interface', 
            category: 'IoT Dashboard',
            color: '#8e2de2',
            image: null
          },
          { 
            title: 'CryptoVault', 
            category: 'Blockchain App',
            color: '#614385',
            image: null
          }
        ],
        about: {
          title: 'About Our Vision',
          leadText: 'We combine cutting-edge technology with creative innovation to deliver exceptional digital experiences.',
          description: "Our team of experts is dedicated to pushing the boundaries of what's possible in the digital realm. With a focus on quality, performance, and user experience, we create solutions that not only meet but exceed expectations.",
          stats: [
            { value: '200+', label: 'Clients' },
            { value: '350+', label: 'Projects' },
            { value: '15+', label: 'Awards' },
            { value: '8+', label: 'Years Experience' }
          ]
        },
        contact: {
          title: 'Get In Touch',
          email: 'contact@cyberbrand.com',
          phone: '+1 (555) 123-4567',
          address: '123 Digital Avenue\nTech City, TC 10010'
        },
        settings: {
          siteName: 'CyberBrand',
          footerText: 'สร้างสรรค์นวัตกรรมเพื่ออนาคต',
          logo: null,
          social: [
            { name: 'Facebook', url: '#', icon: 'fab fa-facebook-f' },
            { name: 'Twitter', url: '#', icon: 'fab fa-twitter' },
            { name: 'Instagram', url: '#', icon: 'fab fa-instagram' },
            { name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin-in' }
          ]
        }
      };

      try {
        const docRef = doc(db, 'site-content', 'main');
        await setDoc(docRef, defaultContent);
        this.content = defaultContent;
      } catch (error) {
        console.error('Error initializing content:', error);
      }
    }
  }
}
  </script>
  
  <style scoped>
  /* Admin Dashboard Styles */
  .admin-dashboard {
    display: flex;
    min-height: 100vh;
    background-color: #0f0f0f;
    color: white;
  }
  
  .sidebar {
    width: 280px;
    background-color: #0a0a0a;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
  }
  
  .logo {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .highlight {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .nav-menu {
    list-style: none;
    padding: 20px 0;
    margin: 0;
    flex-grow: 1;
  }
  
  .nav-menu li {
    padding: 15px 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
  }
  
  .nav-menu li i {
    margin-right: 12px;
    width: 20px;
    text-align: center;
  }
  
  .nav-menu li:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .nav-menu li.active {
    background: linear-gradient(90deg, rgba(106, 17, 203, 0.1), transparent);
    border-left: 3px solid #6a11cb;
    color: #6a11cb;
  }
  
  .admin-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .btn-logout {
    width: 100%;
    padding: 12px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .btn-logout i {
    margin-right: 8px;
  }
  
  .btn-logout:hover {
    background-color: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.2);
  }
  
  .main-content {
    flex: 1;
    margin-left: 280px;
    padding: 30px;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .header h1 {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(to right, #fff, #aaa);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .btn i {
    margin-right: 8px;
  }
  
  .btn.save {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
    color: white;
  }
  
  .btn.save:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 17, 203, 0.4);
  }
  
  .btn.add {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    margin-top: 15px;
  }
  
  .btn.add:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  .content-area {
    background-color: #121212;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 30px;
  }
  
  .edit-section {
    margin-bottom: 40px;
  }
  
  .edit-section h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 12px;
    background-color: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    outline: none;
    border-color: #6a11cb;
    box-shadow: 0 0 0 2px rgba(106, 17, 203, 0.2);
  }
  
  .sortable-list {
    margin-bottom: 20px;
  }
  
  .sortable-item {
    background-color: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .item-header h3,
  .item-header h4 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .item-actions {
    display: flex;
    gap: 5px;
  }
  
  .btn-icon {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-icon:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .btn-icon.delete:hover {
    background-color: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.2);
    color: #ff6b6b;
  }
  
  .btn-icon:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  .image-upload {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .image-preview {
    height: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .image-preview.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.4);
  }
  
  .upload-btn {
    align-self: flex-start;
  }
  
  .hidden-upload {
    display: none;
  }
  
  .color-picker {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: transparent;
  }
  
  .social-links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
  }
  
  .social-item {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 70px;
      overflow: hidden;
    }
    
    .logo-text, .nav-menu li span {
      display: none;
    }
    
    .nav-menu li i {
      margin-right: 0;
    }
    
    .main-content {
      margin-left: 70px;
    }
    
    .btn-logout span {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    .sidebar {
      display: none;
    }
    
    .main-content {
      margin-left: 0;
    }
    
    .header {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }
    
    .sortable-item {
      padding: 15px;
    }
    
    .item-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }
  </style>