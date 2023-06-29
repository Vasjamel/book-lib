
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import LIB_API from '../api/index.js'

const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const isLoggedIn = ref(false)
  const currentUser = ref(null)

  async function register(credentials) {
    const { registerUser } = await LIB_API.getData({
      query: 'mutation RegisterUser($register: UserRegister) { registerUser (register: $register) { accessToken id }}',
      variables: { register: credentials }
    })

    const { accessToken, id } = registerUser
    localStorage.setItem('Lib-access-token', `Bearer ${accessToken}`)
    isLoggedIn.value = true
    await getUser(id)
    router.push('/')
  }

  async function getUser(id) {
    const query = 'query Users ($find: UserFilter) { users (find: $find) { id username email } }'
    const variables = { find: { id } }
    const { users } = await LIB_API.getData({ query, variables })
    currentUser.value = users[0]
  }

  async function login(credentials) {
    const { loginUser } = await LIB_API.getData({
      query: 'mutation LoginUser($login: UserLogin) { loginUser (login: $login) { accessToken id }}',
      variables: { login: credentials }
    })
    const { accessToken, id } = loginUser
    localStorage.setItem('Lib-access-token', `Bearer ${accessToken}`)
    isLoggedIn.value = true
    await getUser(id)
    router.push('/')
  }

  function logout() {
    isLoggedIn.value = false
    currentUser.value = null
    localStorage.removeItem('Lib-access-token')
    router.push('/login')
  }

  return { isLoggedIn, currentUser, login, logout, register }

}, { persist: true })


export default useAuthStore