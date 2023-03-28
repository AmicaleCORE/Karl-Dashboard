import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'Accueil',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: 'Bienvenue'
        }
      },
      {
        path: '/sell',
        name: 'Vendre',
        component: () => import('@/views/products/SellingView.vue'),
        meta: {
          title: 'Vendre'
        }
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

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const title: unknown = to.meta.title
  const dynamicTitle: string | string[] = to.params.pageTitle

  if (title) document.title = `Karl | ${title}`
  if (dynamicTitle) document.title = `Karl | ${dynamicTitle}`

  next()
})

export default router
