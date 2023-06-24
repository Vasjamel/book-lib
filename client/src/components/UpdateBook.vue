<template>
    <div v-if="book">
        BOOK UPDATE
        <TheForm :form-fields="bookFields" @input="updateBook" @submit="saveData" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios';
import { useRoute } from 'vue-router';
import TheForm from './Forms/TheForm.vue';
import router from '../router';

const route = useRoute()

const book = ref(null)
const authors = ref(null)
const enums = ref(null)

// TODO: better approach to type definition
const getType = (value, key) => {
    if (key === 'author') {
        return 'select'
    }
    if (key === 'genre') {
        return 'select'
    }
    return 'text'
}

const getValue = (value, key) => {
    if (Array.isArray(value)) {
        return value.map(val => ({ label: val, value: val }))[0]
    }
    return value
}


const bookFields = computed(() => Object.entries(book.value).map(([key, value]) => {
    const type = getType(value, key)
    return {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        defaultValue: getValue(value, key),
        variable: key,
        placeholder: '',
        type,
        ...(type === 'select' && { options: key === 'author' ? authors.value : enums.value })
    }
}))

const saveData = async () => {
    await axios.post('http://localhost:4000/graphql', {
        query: 'mutation UpdateBook($find: BookFilter, $input: BookInput) {updateBook(find: $find, input: $input) { year title image id genre description author { name id } }}',
        variables: {
            find: { id: route.params.id },
            input: { ...book.value },
        },
    })
    router.push('/')
}

const updateBook = (data) => {
    book.value = data
}


onMounted(async () => {
    const { data } = await axios.post('http://localhost:4000/graphql', {
        query: 'query Books ($find: BookFilter) { books (find: $find) { id title image description year author { label: name value: id } genre } authors { label: name value: id } enums: __type (name: "Genre") { enumValues { label: name value: name } } }',
        variables: { find: { id: route.params.id } }
    })
    book.value = data.data.books[0]
    authors.value = data.data.authors
    enums.value = data.data.enums.enumValues
})

</script>