import { createRouter, createWebHashHistory  } from 'vue-router'
import routes from './route'
const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/home',
      meta: { title: '首页' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
    ...routes
  ],
})
export default router
