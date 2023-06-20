import models from '../../../../db/models/index.js'

const updateAuthor = async (parent, { find = {}, input = {} }, context, info) => {
    const { Author } = models
    await Author.update(input, { where: find });
}

export default updateAuthor