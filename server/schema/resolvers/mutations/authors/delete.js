import { GraphQLError } from 'graphql'
import models from '../../../../db/models/index.js'

const deleteAuthor = async (parent, { find = {} }, context, info) => {
    const { Author } = models
    const author = await Author.findOne({ where: find })
    if (!author) {
        throw new GraphQLError(`Author with ${Object.entries(find).map(([key, value]) => [key, value].join(' ')).join(' and ')} does not exist`)
    }
    await author.destroy()
    return author
}

export default deleteAuthor