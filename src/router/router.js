import Home from '@/pages/Home';
import Posts from '@/pages/Posts';
import About from '@/pages/About';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [ 
  { path: '/', component: Home },
  { path: '/posts', component: Posts },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
