import { createRouter, createWebHistory } from 'vue-router';

type AppRoute = {
  icon: string;
  label: string;
  path: string;
  component: () => unknown;
}

export const routes: AppRoute[] = [
  {
    icon: 'home',
    label: 'Main Page',
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    icon: 'code',
    label: 'Async Test',
    path: '/test/async',
    component: () => import('@/pages/AsyncTestPage.vue'),
  },
  {
    icon: 'code',
    label: 'HTML5 Elements Test',
    path: '/test/elements',
    component: () => import('@/pages/ElementsTestPage.vue'),
  }
]


export default createRouter({
  history: createWebHistory(), routes
})