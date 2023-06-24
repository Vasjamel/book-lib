<template>
    <header class="h-16 bg-accent-color p-2 text-2xl">
        <div class="flex justify-center items-center cursor-pointer" @click="redirectHome">
            <i class="material-icons text-primary-color">menu_book</i>
            <h1 class="text-center text-primary-color font-bold">BOOK LIB</h1>
        </div>
        <button class=" bg-emerald-700 p-3" @click="openCreateBookForm">
            Create book
        </button>
    </header>
</template>

<script  setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const redirectHome = () => {
    router.push('/')
}

const openCreateBookForm = () => {
    router.push('/create-book')
}

</script>