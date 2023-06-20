import createBook from './books/create.js'
import createAuthor from './authors/create.js'
import deleteBook from './books/delete.js'
import deleteAuthor from './authors/delete.js'
import updateAuthor from './authors/update.js'
import updateBook from './books/update.js'

const Mutation = {
  createBook,
  createAuthor,
  deleteBook,
  deleteAuthor,
  updateAuthor,
  updateBook
}

export default Mutation