<template>
    <section class=" rounded-lg flex gap-8 justify-evenly">
        <img v-if="book.image" :src="book.image" class="h-72" />
        <div v-else class="w-68 h-80  bg-gray-300 rounded-lg flex justify-center items-center p-4 text-center">
            <h1>Unfortunately no image</h1>
        </div>
        <div class="text-primary-color font-bold flex flex-col gap-8 text-2xl">
            <div class="text-4xl">{{ book.title }}</div>
            <div>{{ book.author?.name }}</div>
            <div v-if="book.description">Description: {{ book.description }}</div>
            <div v-if="book.year">Year: {{ book.year }}</div>
            <div>Genre:
                <span v-for="genre in book.genre" :key="genre">{{ genre }}</span>
            </div>

            <div class="flex gap-4">
                <TheButton type="primary" classes="w-64" label="Update book" @click="updateBook" />
                <TheButton type="accent" classes=" bg-red-600 text-white" label="Delete book" @click="deleteBook" />
            </div>
        </div>

    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import useBookStore from '../stores/books.js';
import TheButton from '../components/Forms/TheButton.vue'

const book = ref({})
const route = useRoute()
const router = useRouter()

const bookStore = useBookStore()

onMounted(async () => {
    const bookData = await bookStore.getBook(route.params.id)
    book.value = bookData
})

const deleteBook = async () => {
    await bookStore.deleteBook(book.value.id)
}

const updateBook = () => {
    router.push(`/update-book/${book.value.id}`)
}
</script>