<template>
    <div>
        <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12">
            <LibCard @click="openCreateBookForm" class=" cursor-pointer">
                <div class="flex justify-center align-center mt-64">
                    <TheButton classes="" type="accent" :outline="false" label="Add new book" />
                </div>
            </LibCard>
            <LibCard v-for="book in books" :key="book.id" :book="book" class="shrink-0" @click="handleClick(book)" />
        </section>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { computed, onMounted } from 'vue'
import LibCard from './LibCard.vue'
import TheButton from './Forms/TheButton.vue';

import useBookStore from '../stores/books.js'

import { storeToRefs } from 'pinia';

const router = useRouter()
const bookStore = useBookStore()
const { books } = storeToRefs(bookStore)

onMounted(async () => {
    await bookStore.getBooks()
})

const openCreateBookForm = () => {
    router.push('/create-book')
}

function handleClick(book) {
    router.push({ path: `book-${book.id}` })
}
</script>