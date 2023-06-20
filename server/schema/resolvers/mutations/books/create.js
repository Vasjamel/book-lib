import { v4 as uuid } from 'uuid'
import models from '../../../../db/models/index.js'

const createBook = async (parent, { input = {} }, context, info) => {
  const { Author, Book } = models
  const newBook = { ...input }
  if (!newBook.id) {
    newBook.id = uuid();
  }
  newBook.AuthorId = newBook.author
  const book = await Book.create(newBook, { include: Author })
  return {
    ...book.toJSON(),
    author: book.Author
  }
}

export default createBook