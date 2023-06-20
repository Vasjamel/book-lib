import { createRouter, createWebHistory } from 'vue-router'

import MainList from '../components/MainList.vue'
import BookPage from '../components/BookPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/book/:id', component: BookPage },
    {
      path: '/',
      component: MainList
    },
  ]
})

export default router
