import { createRouter, createWebHistory } from 'vue-router'

import MainList from '../components/MainList.vue'
import BookPage from '../components/BookPage.vue'
import CreateBook from '../components/CreateBook.vue'
import UpdateBook from '../components/UpdateBook.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/book/:id', component: BookPage },
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
  ]
})

export default router
