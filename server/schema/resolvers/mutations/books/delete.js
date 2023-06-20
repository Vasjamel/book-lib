import { GraphQLError } from 'graphql';
import models from '../../../../db/models/index.js'


const deleteBook = async (parent, { find = {} }, context, info) => {
    const { Book } = models
    const book = await Book.findOne({ where: find })
    if (!book) {
        throw new GraphQLError(`Book ${Object.entries(find).map(([key, value]) => `with ${key}: ${value}`)}, does not exist`)
    }
    await book.destroy()
    return book
}

export default deleteBook