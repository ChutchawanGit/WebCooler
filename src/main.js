import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles.css';

// Custom directives
import scrollAnimation from './directives/scrollAnimation';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCode, 
  faPaintBrush, 
  faMobileAlt, 
  faChartLine,
  faLock,
  faChevronUp, 
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faEye,
  faEyeSlash,
  faArrowLeft,
  faHome,
  faBriefcase,
  faInfoCircle,
  faCog,
  faUserCog,
  faSignOutAlt,
  faSave,
  faTrash,
  faArrowUp,
  faArrowDown,
  faUpload,
  faPlus,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(
  // Basic icons
  faCode, 
  faPaintBrush, 
  faMobileAlt, 
  faChartLine,
  faLock,
  faChevronUp,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faEye,
  faEyeSlash,
  faArrowLeft,
  
  // Admin dashboard icons
  faHome,
  faBriefcase,
  faInfoCircle,
  faCog,
  faUserCog,
  faSignOutAlt,
  faSave,
  faTrash,
  faArrowUp,
  faArrowDown,
  faUpload,
  faPlus,
  faGlobe
);

// Create app
const app = createApp(App);

// Register FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Register custom directives
app.directive('scroll-animate', scrollAnimation);

// Use router and store
app.use(router);
app.use(store);

// Mount app
app.mount('#app');