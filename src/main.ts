import 'xel';

import * as vue from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.ts';

vue.createApp(App)
  .use(router)
  .mount('#app');
