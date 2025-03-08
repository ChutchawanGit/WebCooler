/* eslint-disable */
import { createStore } from 'vuex';
import authService from '../auth/authService';
import { resizeAndCompressImage } from '../utils';

// Default site content (เนื้อหาเริ่มต้นสำหรับเว็บไซต์)
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

export default createStore({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    userData: null,
    siteContent: null,
    defaultContent: defaultContent
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    isAdminUser: state => state.isAdmin,
    userData: state => state.userData,
    getSiteContent: state => state.siteContent || state.defaultContent,
    getHeroSection: state => (state.siteContent || state.defaultContent).hero,
    getServices: state => (state.siteContent || state.defaultContent).services,
    getProjects: state => (state.siteContent || state.defaultContent).projects,
    getAboutSection: state => (state.siteContent || state.defaultContent).about,
    getContactInfo: state => (state.siteContent || state.defaultContent).contact,
    getSiteSettings: state => (state.siteContent || state.defaultContent).settings
  },
  mutations: {
    SET_AUTH_STATE(state, status) {
      state.isLoggedIn = status;
    },
    SET_ADMIN_STATE(state, status) {
      state.isAdmin = status;
    },
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    SET_SITE_CONTENT(state, content) {
      state.siteContent = content;
    },
    UPDATE_SECTION(state, { section, data }) {
      if (state.siteContent) {
        state.siteContent[section] = data;
      } else {
        // Create a new state.siteContent by cloning defaultContent first
        state.siteContent = JSON.parse(JSON.stringify(state.defaultContent));
        state.siteContent[section] = data;
      }
    }
  },
  actions: {
    // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อแอปเริ่มทำงาน
    checkAuth({ commit }) {
      const isLoggedIn = authService.isAuthenticated();
      const isAdmin = authService.isAdmin();
      const userData = authService.getUserData();
      
      commit('SET_AUTH_STATE', isLoggedIn);
      commit('SET_ADMIN_STATE', isAdmin);
      commit('SET_USER_DATA', userData);
    },
    
    // เข้าสู่ระบบ
// เข้าสู่ระบบ
login({ commit }, { username, password }) {
  const success = authService.login(username, password);
  if (success) {
    const isAdmin = authService.isAdmin();
    const userData = authService.getUserData();
    
    commit('SET_AUTH_STATE', true);
    commit('SET_ADMIN_STATE', isAdmin);
    commit('SET_USER_DATA', userData);
    return true;
  }
  return false;
},
    
    // ออกจากระบบ
    logout({ commit }) {
      authService.logout();
      commit('SET_AUTH_STATE', false);
      commit('SET_ADMIN_STATE', false);
      commit('SET_USER_DATA', null);
    },
    
    // โหลดเนื้อหาเว็บไซต์
    loadSiteContent({ commit }) {
      const content = localStorage.getItem('siteContent');
      if (content) {
        try {
          commit('SET_SITE_CONTENT', JSON.parse(content));
        } catch (error) {
          console.error('Error parsing site content:', error);
          // หากมีข้อผิดพลาดในการแปลงข้อมูล ให้ล้างข้อมูลเดิมและใช้ค่าเริ่มต้น
          localStorage.removeItem('siteContent');
        }
      }
    },
    
    // บันทึกเนื้อหาเว็บไซต์
// บันทึกเนื้อหาเว็บไซต์แบบแยกส่วน

    // REPLACE THIS function - ลบฟังก์ชัน saveSiteContent เดิมและใช้อันนี้แทน
    saveSiteContent({ commit }, content) {
      try {
        // ใช้ content ที่ส่งมา
        const contentToSave = content;
        
        // แยกเก็บข้อมูลทีละส่วน
        localStorage.setItem('siteContent_hero', JSON.stringify(contentToSave.hero));
        localStorage.setItem('siteContent_services', JSON.stringify(contentToSave.services));
        localStorage.setItem('siteContent_projects', JSON.stringify(contentToSave.projects));
        localStorage.setItem('siteContent_about', JSON.stringify(contentToSave.about));
        localStorage.setItem('siteContent_contact', JSON.stringify(contentToSave.contact));
        localStorage.setItem('siteContent_settings', JSON.stringify(contentToSave.settings));
        
        // อัปเดตใน store
        commit('SET_SITE_CONTENT', contentToSave);
        return true;
      } catch (error) {
        console.error('Error saving site content:', error);
        return false;
      }
    },
    
// อัปเดตเฉพาะส่วนของเนื้อหา
async updateSection({ commit, dispatch, state }, { section, data }) {
  try {
    // ถ้าเป็นส่วนที่มีโอกาสมีรูปภาพ
    if (section === 'projects' || section === 'settings') {
      // วนลูปผ่านทุก item ใน data และบีบอัดรูปภาพ
      for (let i = 0; i < data.length; i++) {
        if (data[i].image && typeof data[i].image === 'string' && data[i].image.startsWith('data:image')) {
          data[i].image = await resizeAndCompressImage(data[i].image);
        }
      }
    }
    
    // อัปเดต state
    commit('UPDATE_SECTION', { section, data });
    
    // บันทึกเฉพาะส่วนที่เปลี่ยนแปลง
    localStorage.setItem(`siteContent_${section}`, JSON.stringify(data));
    
    return true;
  } catch (error) {
    console.error(`Error updating section ${section}:`, error);
    return false;
  }
},
// โหลดเนื้อหาเว็บไซต์แบบแยกส่วน
    // REPLACE THIS function - ลบฟังก์ชัน loadSiteContent เดิมและใช้อันนี้แทน
    loadSiteContent({ commit, state }) {
      try {
        // สร้าง object สำหรับเก็บข้อมูลรวม
        const content = {};
        
        // พยายามโหลดแต่ละส่วน
        try {
          content.hero = JSON.parse(localStorage.getItem('siteContent_hero')) || state.defaultContent.hero;
        } catch (e) {
          content.hero = state.defaultContent.hero;
        }
        
        try {
          content.services = JSON.parse(localStorage.getItem('siteContent_services')) || state.defaultContent.services;
        } catch (e) {
          content.services = state.defaultContent.services;
        }
        
        try {
          content.projects = JSON.parse(localStorage.getItem('siteContent_projects')) || state.defaultContent.projects;
        } catch (e) {
          content.projects = state.defaultContent.projects;
        }
        
        try {
          content.about = JSON.parse(localStorage.getItem('siteContent_about')) || state.defaultContent.about;
        } catch (e) {
          content.about = state.defaultContent.about;
        }
        
        try {
          content.contact = JSON.parse(localStorage.getItem('siteContent_contact')) || state.defaultContent.contact;
        } catch (e) {
          content.contact = state.defaultContent.contact;
        }
        
        try {
          content.settings = JSON.parse(localStorage.getItem('siteContent_settings')) || state.defaultContent.settings;
        } catch (e) {
          content.settings = state.defaultContent.settings;
        }
        
        // อัปเดต store
        commit('SET_SITE_CONTENT', content);
        return true;
      } catch (error) {
        console.error('Error loading site content:', error);
        return false;
      }
    },

    // อัปเดตเฉพาะส่วนของเนื้อหา
    // REPLACE THIS function - ลบฟังก์ชัน updateSection เดิมและใช้อันนี้แทน
    updateSection({ commit }, { section, data }) {
      try {
        // อัปเดต state
        commit('UPDATE_SECTION', { section, data });
        
        // บันทึกเฉพาะส่วนที่เปลี่ยนแปลง
        localStorage.setItem(`siteContent_${section}`, JSON.stringify(data));
        
        return true;
      } catch (error) {
        console.error(`Error updating section ${section}:`, error);
        return false;
      }
    }
    
  },
  modules: {}
});