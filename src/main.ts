import * as vue from 'vue';
import './style.css';
import App from './App.vue';
import router from './router.ts';

console.log(vue);

const app = vue.createApp(App).use(router).mount('#app');
