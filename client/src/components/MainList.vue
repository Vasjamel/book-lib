<template>
    <div>
        <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12">
            <LibCard v-for="book in books" :key="book.id" :book="book" class="shrink-0" @click="handleClick(book)" />
        </section>

    </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router';

import { ref, onMounted } from 'vue'
import LibCard from './LibCard.vue'
import TheForm from './Forms/TheForm.vue'

const books = ref([])
const router = useRouter()

onMounted(async () => {
    const res = await axios.post('http://localhost:4000/graphql', {
        query: '{ books { id title image author { name } genre }}'
    })
    books.value = res.data.data.books
})

function handleClick(book) {
    router.push({ path: `book/${book.id}` })
}
</script>