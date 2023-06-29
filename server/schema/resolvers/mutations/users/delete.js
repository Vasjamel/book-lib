import User from '../../../../db/models/user.js'
import { GraphQLError } from 'graphql'

const deleteUser = async (parent, { find }, context, info) => {
    const user = await User.findOne({ where: find })
    if (!user) {
        throw new GraphQLError(`User ${Object.entries(find).map(([key, value]) => `with ${key}: ${value}`)}, does not exist`)
    }
    await user.destroy()
    return user
}

export default deleteUser