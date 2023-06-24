import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import User from '../../../../db/models/user.js'
import { GraphQLError } from 'graphql'

const registerUser = async (parent, { register }, context, info) => {
    const { email, password, username } = register
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        throw new GraphQLError('User with this email exists. Please login')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { id: uuid(), email, username, password: hashedPassword }
    const created = await User.create(newUser);
    return created.toJSON()
}

export default registerUser