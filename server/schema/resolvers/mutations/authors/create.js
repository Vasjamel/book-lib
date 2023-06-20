import { v4 as uuid } from 'uuid'
import models from '../../../../db/models/index.js'

const createAuthor = async (parent, { input = {} }, context, info) => {
  const { Author, Book } = models
  const newAuthor = input
  if (!newAuthor.id) {
    newAuthor.id = uuid()
  }
  const author = await Author.create(newAuthor, { include: Book })
  author.books = author.Books
  return author.toJSON()
}

export default createAuthor