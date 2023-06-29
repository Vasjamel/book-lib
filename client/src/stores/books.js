import { defineStore } from 'pinia'

import LIB_API from '../api/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const useBookStore = defineStore('books', () => {
    const router = useRouter()
    const books = ref(null)

    async function getBooks() {
        const { books: booksData } = await LIB_API.getData({ query: '{ books { id title image author { name } genre } }' })
        books.value = booksData
    }

    async function getBook(id) {
        const { books } = await LIB_API.getData({
            query: 'query Books ($find: BookFilter) { books (find: $find) { id title image description year author { name id } genre }}',
            variables: { find: { id } }
        })
        return books[0]
    }

    async function createBook(book) {
        await LIB_API.getData({
            query: 'mutation CreateBook($input: BookInput) { createBook(input: $input) { year title image id genre description author { name id } } }',
            variables: {
                input: book
            }
        })
        router.push('/')
    }

    async function deleteBook(id) {
        await LIB_API.getData({
            query: 'mutation DeleteBook($find: BookFilter) { deleteBook(find: $find) { id title image description year author { name id } genre } }',
            variables: {
                find: { id }
            }
        })
        router.push('/')
    }

    async function getAuthorsAndGenres() {
        const { genres, authors } = await LIB_API.getData({
            query: '{ authors { id name } genres: __type (name: "Genre") { enumValues {  name } } }'
        })
        console.log('genres', genres)
        return { genresData: genres, authorsData: authors }
    }

    return { books, getBooks, getBook, createBook, deleteBook, getAuthorsAndGenres }
})

export default useBookStore