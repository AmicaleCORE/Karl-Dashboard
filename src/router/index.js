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
        component: () => import('@/views/products/SellingPanel.vue'),
        meta: {
          title: 'Magasin'
        }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/users/profile/ProfileView.vue'),
        meta: {
          title: 'Mon profil'
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
  if (title) document.title = `Karl | ${title}`
  next()
})

export default router
