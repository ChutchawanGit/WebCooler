// directive สำหรับจัดการ scroll animation
export default {
    mounted(el, binding) {
      // ตั้งค่า default options
      const options = {
        threshold: 0.1, // ควรปรากฏเมื่อมีส่วนที่มองเห็น 10%
        rootMargin: '0px 0px -50px 0px' // ให้เริ่มแสดงก่อนเข้าสู่วิวพอร์ต 50px
      };
      
      // กำหนดค่า delay ตาม binding (ถ้ามี)
      const delay = binding.value?.delay || 0;
      const animationType = binding.value?.type || 'fade-up';
      
      // ติดตั้ง initial styles
      el.style.opacity = '0';
      el.style.transition = `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`;
      
      // การกำหนด transform ตาม animation type
      switch (animationType) {
        case 'fade-up':
          el.style.transform = 'translateY(50px)';
          break;
        case 'fade-down':
          el.style.transform = 'translateY(-50px)';
          break;
        case 'fade-left':
          el.style.transform = 'translateX(-50px)';
          break;
        case 'fade-right':
          el.style.transform = 'translateX(50px)';
          break;
        case 'zoom-in':
          el.style.transform = 'scale(0.9)';
          break;
        case 'zoom-out':
          el.style.transform = 'scale(1.1)';
          break;
        default:
          el.style.transform = 'translateY(50px)';
      }
      
      // Intersection Observer ที่ตรวจสอบเมื่อองค์ประกอบเข้าสู่วิวพอร์ต
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // เมื่อสิ่งนี้ปรากฏในหน้าจอ
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translate(0) scale(1)';
            }, delay);
            
            // หยุดการตรวจสอบเมื่อเอฟเฟกต์ถูกเรียกใช้แล้ว
            observer.unobserve(el);
          }
        });
      }, options);
      
      // เริ่มการตรวจสอบ
      observer.observe(el);
    }
  };