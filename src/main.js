import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.css';

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCode, 
  faPaintBrush, 
  faMobileAlt, 
  faChartLine 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(faCode, faPaintBrush, faMobileAlt, faChartLine);

// Create app
const app = createApp(App);

// Register FontAwesome component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use router and store
app.use(router);
app.use(store);

// Mount app
app.mount('#app');