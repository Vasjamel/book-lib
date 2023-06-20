<template>
    <section>
        <img v-if="book.image" :src="book.image" class="h-72" />
        <div>{{ book.title }}</div>
        <div>{{ book.author }}</div>
        <div>{{ book.description }}</div>
        <div>{{ book.year }}</div>
        <div>{{ book.genre }}</div>
    </section>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const book = ref({})
const route = useRoute()

onMounted(async () => {
    const res = await axios.post('http://localhost:4000/graphql', {
        query: 'query Books ($find: BookFilter) { books (find: $find) { id title image description year author { name id } genre }}',
        variables: { find: { id: route.params.id } }
    })
    book.value = res.data.data.books[0]
})

</script>