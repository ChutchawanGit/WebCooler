<template>
  <section id="work" class="section work-section">
    <div class="container">
      <h2 class="section-title" v-scroll-animate>Our Work</h2>
      <div class="work-grid">
        <div 
          class="work-item" 
          v-for="(project, index) in projectData" 
          :key="index" 
          @click="showProjectDetails(index)"
          v-scroll-animate="{ delay: index * 150, type: 'fade-up' }"
        >
          <!-- แสดงรูปภาพถ้ามี หรือใช้สีพื้นหลังถ้าไม่มีรูปภาพ -->
          <div class="work-image" 
               :style="getProjectStyle(project)">
            <div class="work-overlay">
              <h3>{{ project.title }}</h3>
              <p>{{ project.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

// src/components/WorkSection.vue
<script>
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default {
  name: 'WorkSection',
  data() {
    return {
      projects: [],
      loading: true
    }
  },
  created() {
    // ติดตามการเปลี่ยนแปลงข้อมูลแบบ Real-time
    const docRef = doc(db, 'site-content', 'main');
    this.unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        this.projects = doc.data().projects || [];
      }
      this.loading = false;
    });
  },
  beforeUnmount() {
    // ยกเลิกการติดตามเมื่อ component ถูกทำลาย
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
  methods: {
    showProjectDetails(index) {
      alert(`Project details for: ${this.projects[index].title}`);
    },
    getProjectStyle(project) {
      if (project.imageUrl) { // เปลี่ยนจาก image เป็น imageUrl ตาม schema
        return {
          backgroundImage: `url(${project.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      }
      return {
        backgroundColor: project.color || '#6a11cb'
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

.work-section {
  background-color: #0c0c0c;
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

.work-item {
  height: 250px;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.work-item:hover {
  transform: translateY(-10px) !important;
}

.work-image {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.work-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  transform: translateY(50px);
  opacity: 0;
  transition: all 0.3s ease;
}

.work-item:hover .work-overlay {
  transform: translateY(0);
  opacity: 1;
}

.work-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.work-overlay p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
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
  .work-grid {
    grid-template-columns: 1fr;
  }
}
</style>