<template>
    <div v-if="book" class="flex flex-col align-center justify-center items-center">
        BOOK UPDATE
        <TheForm :form-fields="bookFields" has-submit-button @input="updateBook" @submit="saveData" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from '../axios/index.js';
import { useRoute } from 'vue-router';
import TheForm from './Forms/TheForm.vue';
import useBookStore from '../stores/books.js'

const route = useRoute()
const store = useBookStore()

const book = ref(null)
const authors = ref(null)
const genres = ref(null)

// TODO: better approach to type definition

// const getType = (value, key) => {
//     if (key === 'author') {
//         return 'select'
//     }
//     if (key === 'genre') {
//         return 'select'
//     }
//     return 'text'
// }

const saveData = async () => {
  const normalizedBook = {
    ...book.value,
    ...(book.value.genre && { genre: book.value.genre.value }),
    ...(book.value.author && { author: book.value.author.value })
  }
  await store.updateBook(route.params.id, normalizedBook)
}

const updateBook = (data) => {
  book.value = data
}


onMounted(async () => {
  const { data } = await axios({
    data: {
      query: 'query Books ($find: BookFilter) { books (find: $find) { id title image description year author { label: name value: id } genre } authors { label: name value: id } genres: __type (name: "Genre") { enumValues { label: name value: name } } }',
      variables: { find: { id: route.params.id } }
    }
  })
  authors.value = data.data.authors
  genres.value = data.data.genres.enumValues
  const bookData = { ...data.data.books[0] }
  book.value = bookData
})



const bookFields = computed(() => [{
  variable: 'title',
  label: 'Title',
  placeholder: 'Title',
  defaultValue: book.value.title || '',
  type: 'text',
}, {
  variable: 'description',
  label: 'Book description',
  placeholder: 'Description',
  defaultValue: book.value.description || '',
  type: 'text'
},
{
  variable: 'year',
  label: 'Publishing year',
  placeholder: 'Publishing year',
  defaultValue: book.value.year || '',
  type: 'number'
},
{
  variable: 'image',
  label: 'Image URL',
  placeholder: 'URL Address',
  defaultValue: book.value.image || '',
  type: 'text',
},
{
  variable: 'author',
  label: 'Author',
  placeholder: 'Author',
  defaultValue: book.value.author,
  type: 'select',
  options: authors.value
},
{
  variable: 'genre',
  label: 'Genre',
  placeholder: 'Genre',
  defaultValue: book.value.genre,
  type: 'select',
  options: genres.value
}])



</script>