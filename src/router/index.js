import { createRouter, createWebHashHistory } from 'vue-router';

import Main from '@/components/Main.vue';
import Request from '@/components/Request.vue';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/request',
    name: 'Request',
    component: Request,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
