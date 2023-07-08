import models from '../../../../db/models/index.js'

const updateBook = async (parent, { find = {}, input = {} }, context, info) => {
    const { Book } = models
  const updatedBook = await Book.update(input, { where: find });
  if (!updatedBook) {
    throw new GraphQLError(`Could not update this book`)
  }
  return updatedBook
}

export default updateBook