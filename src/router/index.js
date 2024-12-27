import { createRouter, createWebHashHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory (import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path:'/test',
      name: 'test',
      component: () => import('../views/test.vue'),
    },
    {
      path:'/canvas',
      name: 'canvas',
      component: () => import('../views/CanvasView.vue'),
    },
    {
      path:'/animation',
      name:'animation',
      component: () => import('../views/Animation.vue')
    },
    {
      path: '/linearGradient',
      name: 'linearGradient',
      component: () => import('../views/LinearGradient.vue')
    },
    {
      path:'/transform3d',
      name: 'transform3d',
      component: () => import('../views/Transform3d.vue')
    },
    {
      path:'/other',
      name: 'other',
      component: () => import('../views/Other.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
    }
  ],
})

export default router
