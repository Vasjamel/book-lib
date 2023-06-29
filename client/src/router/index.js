import { createRouter, createWebHistory, } from 'vue-router'

import useAuthStore from '../stores/auth.js'

import MainList from '../components/MainList.vue'
import BookPage from '../components/BookPage.vue'
import CreateBook from '../components/CreateBook.vue'
import UpdateBook from '../components/UpdateBook.vue'
import LoginForm from '../components/Auth/LoginForm.vue'
import RegisterForm from '../components/Auth/RegisterForm.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/book-:id', component: BookPage },
    {
      path: '/',
      component: MainList
    },
    {
      path: '/create-book',
      component: CreateBook
    },
    {
      path: '/update-book/:id',
      component: UpdateBook
    },
    {
      path: '/login',
      component: LoginForm
    },
    {
      path: '/register',
      component: RegisterForm
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const loginRoute = to.path === '/login' || to.path === '/register'
  const noAccess = !authStore.isLoggedIn && !loginRoute
  if (noAccess) {
    return next('/login')
  }
  if (authStore.isLoggedIn && loginRoute) {
    return next('/')
  }
  next()
})

export default router
