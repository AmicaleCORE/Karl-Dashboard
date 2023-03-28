import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'Bienvenue',
        component: () => import('@/views/HomeView.vue')
      }
    ]
  },
  {
    path: '/auth/',
    // redirect: '/auth/login',
    name: 'Authentification',
    component: () => import('@/layouts/AuthenticationLayout.vue'),
    children: [
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
