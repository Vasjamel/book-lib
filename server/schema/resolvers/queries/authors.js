import authenticateUser from '../../../auth/index.js'
import models from '../../../db/models/index.js'

const authorsQuery = async (parent, { find = {} }, context) => {
  const { Author, Book } = models
  const authors = await Author.findAll({ where: { ...find }, include: Book })

  return authors.map(author => ({
    ...author.toJSON(),
    books: author.Books
  }))
}

export default authorsQuery