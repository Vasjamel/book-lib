import { defineStore } from 'pinia'

import LIB_API from '../api/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const useBookStore = defineStore('books', () => {
    const router = useRouter()
    const books = ref(null)

    async function getBooks() {
      const { books: booksData } = await LIB_API.runOperation({ query: '{ books { id title image author { name } genre } }' })
        books.value = booksData
    }

    async function getBook(id) {
      const { books } = await LIB_API.runOperation({
            query: 'query Books ($find: BookFilter) { books (find: $find) { id title image description year author { name id } genre }}',
            variables: { find: { id } }
        })
        return books[0]
    }

    async function createBook(book) {
      await LIB_API.runOperation({
            query: 'mutation CreateBook($input: BookInput) { createBook(input: $input) { year title image id genre description author { name id } } }',
            variables: {
                input: book
            }
        })
        router.push('/')
    }

    async function deleteBook(id) {
      await LIB_API.runOperation({
            query: 'mutation DeleteBook($find: BookFilter) { deleteBook(find: $find) { id title image description year author { name id } genre } }',
            variables: {
                find: { id }
            }
        })
        router.push('/')
    }

  async function updateBook(id, input) {
    await LIB_API.runOperation({
      query: 'mutation UpdateBook($find: BookFilter, $input: BookUpdate) {updateBook(find: $find, input: $input) { year title image id genre description author { name id } }}',
      variables: {
        find: { id },
        input,
      }
    })
    router.push('/')
  };

    async function getAuthorsAndGenres() {
      const { genres, authors } = await LIB_API.runOperation({
            query: '{ authors { id name } genres: __type (name: "Genre") { enumValues {  name } } }'
      })
        return { genresData: genres, authorsData: authors }
    }

  async function createAuthor(input) {
    const { createAuthor } = await LIB_API.runOperation({
      query: 'mutation CreateAuthor($input: AuthorInput) { createAuthor(input: $input) { id name } } ',
      variables: { input }
    })
    if (createAuthor) {
      router.push('/create-book')
    }
  }

  return { books, getBooks, getBook, createBook, deleteBook, updateBook, getAuthorsAndGenres, createAuthor }
})

export default useBookStore