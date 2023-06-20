import models from '../../../../db/models/index.js'

const updateBook = async (parent, { find = {}, input = {} }, context, info) => {
    const { Book } = models
    await Book.update(input, { where: find });
}

export default updateBook