import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
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
        name: 'Magasin',
        component: () => import('@/views/products/SellingView.vue'),
        meta: {
          title: 'Magasin'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  const dynamicTitle = to.params.title

  if (title) document.title = `Karl | ${title}`
  if (dynamicTitle) document.title = `Karl | ${dynamicTitle}`

  next()
})

export default router
