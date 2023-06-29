<template>
    <header class="h-16 bg-accent-color p-3 text-2xl text-primary-color">
        <div class="flex justify-between items-center">
            <i class="material-icons px-4 cursor-pointer" @click="redirectHome">menu_book</i>
            <h1 class="text-center font-bold  cursor-pointer" @click="redirectHome">BOOK LIB</h1>
            <div class=" flex flex-row">

                <TheButton v-if="isLoggedIn" type="primary" @click="logout">
                    <div class="flex flex-row justify-center items-center gap-2">
                        <i class="material-icons cursor-pointer" @click="redirectHome">account_circle</i>
                        <div class=" text-base">{{ userName }}</div>
                    </div>
                </TheButton>
            </div>
        </div>
    </header>
</template>

<script  setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import TheButton from '../Forms/TheButton.vue';

import useAuthStore from '../../stores/auth.js'

const router = useRouter()

const authStore = useAuthStore()

const redirectHome = () => {
    router.push('/')
}

const isLoggedIn = computed(() => authStore.isLoggedIn)
const userName = computed(() => authStore.currentUser?.username || authStore.currentUser?.email || '')

const openCreateBookForm = () => {
    router.push('/create-book')
}

const logout = () => {
    authStore.logout()
}
</script>