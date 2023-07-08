<template>
  <div class="flex flex-col align-center justify-center items-center">
    <TheForm :form-fields="authorFields" has-submit-button @input="updateAuthor" @submit="saveAuthor" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TheForm from './Forms/TheForm.vue';
import useBookStore from '../stores/books';

const bookStore = useBookStore()

const author = ref(null)

const authorFields = [{
  type: 'text',
  label: "Author name",
  defaultValue: '',
  variable: 'name',
  placeholder: 'name'
}]

const updateAuthor = (data) => {
  author.value = data
}

const saveAuthor = () => {
  if (author.value?.name?.length) {
    bookStore.createAuthor(author.value)
  }
}

</script>