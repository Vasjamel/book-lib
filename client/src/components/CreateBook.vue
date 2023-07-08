<template>
    <div class="flex flex-col align-center justify-center items-center">
        <TheForm :form-fields="formFieldsLocal" has-submit-button @submit="createBook" @input="updateBookDraft" />
            <TheButton classes=" text-lg" label="Create new author" :outline="false" @click="router.push('/create-author')" />

        <div v-if="bookDraft">
            <LibCard :book="bookDraft" />
        </div>
    </div>
</template>

<script setup>
import LibCard from './LibCard.vue';
import TheForm from './Forms/TheForm.vue';
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import useBookStore from '../stores/books.js';
import TheButton from './Forms/TheButton.vue';

const bookStore = useBookStore()
const router = useRouter()

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
    await bookStore.createBook({ ...bookDraft.value, author, genre })
}

onMounted(async () => {
    const { genresData, authorsData } = await bookStore.getAuthorsAndGenres()
    authors.value = authorsData
    genres.value = genresData.enumValues.map(({ name }) => ({ label: name, value: name }))
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
}])
</script>
