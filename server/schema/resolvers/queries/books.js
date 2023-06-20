import models from '../../../db/models/index.js'

const booksQuery = async (parent, { find = {} }, context) => {
  const { Author, Book } = models

  const books = await Book.findAll({ where: find, include: Author })
  return books.map(book => ({
    ...book.toJSON(),
    author: book.Author
  }))
}

export default booksQuery