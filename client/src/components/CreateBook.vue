<template>
    <div class="flex flex-row justify-evenly">
        <div>
            <TheForm :form-fields="formFieldsLocal" @submit="createBook" @input="updateBookDraft" />
        </div>
        <div class=" block">
            <LibCard v-if="bookDraft" :book="bookDraft" />
            <SelectMultiple />
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import LibCard from './LibCard.vue';
import TheForm from './Forms/TheForm.vue';
import { ref, onMounted, computed } from 'vue'
import SelectMultiple from './Forms/SelectMultiple.vue';

const authors = ref([])
const genres = ref([])

const authorOptions = computed(() => authors.value.map(author => ({ label: author.name, value: author.id })))
const bookDraft = ref(null)

const updateBookDraft = (data) => {
    const localBookValue = { ...data }
    localBookValue.author = authors.value.find(author => author.id === data.author)
    bookDraft.value = localBookValue
}

const createBook = async () => {
    const author = bookDraft.value.author.id
    const genre = [bookDraft.value.genre]
    const res = await axios.post('http://localhost:4000/graphql', {
        query: 'mutation CreateBook($input: BookInput) { createBook(input: $input) { year title image id genre description author { name id } } }',
        variables: {
            input: { ...bookDraft.value, author, genre }
        },
    })
    console.log('{ res }', { res })
}

onMounted(async () => {
    const { data } = await axios.post('http://localhost:4000/graphql', {
        query: '{ authors { id name } __type (name: "Genre") { enumValues {  name } } }'
    })
    console.log('data', data)
    authors.value = data.data.authors
    genres.value = data.data.__type.enumValues.map(({ name }) => ({ label: name, value: name }))
})



const formFieldsLocal = ref([{
    variable: 'title',
    label: 'Title',
    placeholder: 'Title',
    defaultValue: '',
    type: 'text',
}, {
    variable: 'description',
    label: 'Book description',
    placeholder: 'Description',
    defaultValue: '',
    type: 'text'
},
{
    variable: 'year',
    label: 'Publishing year',
    placeholder: 'Publishing year',
    defaultValue: '',
    type: 'number'
},
{
    variable: 'image',
    label: 'Image URL',
    placeholder: 'URL Address',
    defaultValue: '',
    type: 'text',
},
{
    variable: 'author',
    label: 'Author',
    placeholder: 'Author',
    defaultValue: '',
    type: 'select',
    options: authorOptions
},
{
    variable: 'genre',
    label: 'Genre',
    placeholder: 'Genre',
    defaultValue: '',
    multiple: true,
    type: 'select',
    options: genres
},

    // {
    //     variable: 'email',
    //     label: 'Email',
    //     placeholder: 'Email',
    //     defaultValue: '',
    //     type: 'email',
    // },
    // {
    //     variable: 'password',
    //     label: 'Password',
    //     placeholder: 'Password',
    //     defaultValue: '',
    //     type: 'password',
    // },
    // {
    //     variable: 'dropdown',
    //     label: 'dropdown',
    //     placeholder: 'dropdown',
    //     defaultValue: '',
    //     type: 'dropdown',
    //     options: ['litr', 'pes'],
    // },
    // {
    //     variable: 'check',
    //     label: 'check',
    //     placeholder: 'check',
    //     type: 'checkbox',
    // },
])
</script>
