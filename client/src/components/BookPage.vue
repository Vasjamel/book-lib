<template>
    <section>
        <img v-if="book.image" :src="book.image" class="h-72" />
        <div>{{ book.title }}</div>
        <div>{{ book.author }}</div>
        <div>{{ book.description }}</div>
        <div>{{ book.year }}</div>
        <div>{{ book.genre }}</div>
        <button class=" bg-red-600 p-4" @click="deleteBook">Delete book</button>
        <button class=" bg-red-600 p-4" @click="updateBook">Update book</button>
    </section>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';

const book = ref({})
const route = useRoute()
const router = useRouter()

onMounted(async () => {
    const res = await axios.post('http://localhost:4000/graphql', {
        query: 'query Books ($find: BookFilter) { books (find: $find) { id title image description year author { name id } genre }}',
        variables: { find: { id: route.params.id } }
    })
    book.value = res.data.data.books[0]
})

const deleteBook = async () => {
    const res = await axios.post('http://localhost:4000/graphql', {
        query: 'mutation DeleteBook($find: BookFilter) { deleteBook(find: $find) { id title image description year author { name id } genre } }',
        variables: {
            find: { id: book.value.id }
        }
    })
    console.log('res', res)
    if (res.statusText === 'OK') {
        router.push('/')
    }
}

const updateBook = () => {
    router.push(`/update-book/${book.value.id}`)
}
</script>