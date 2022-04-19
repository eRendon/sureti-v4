import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { useAuthStore } from '@/store/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next): void => {

  const authStore = useAuthStore()
  const auth = localStorage.getItem('auth')
  if (auth) {
    authStore.$patch({
      auth: { isLoggedIn: true}
    })
  }

  const { isLoggedIn } = authStore.getStateAuth
  const isNewUser = authStore.getStateIsNewUser
  console.log('isLoggedIn', isLoggedIn)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({
        name: 'Login'
      })
    } else {
      if (isNewUser) {
        next()
        // next({
        //   name: 'OnBoarding'
        // })
      } else {
        if (to.name === 'OnBoarding') {
          next({
            name: 'Dashboard'
          })
        } else {
          next()
        }
        console.log('isNewUser', isNewUser)
        console.log('to', to)
        console.log('from', from)
      }
    }
  } else {
    next()
  }
})

export default router;
