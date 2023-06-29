import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'
import User from '../../../../db/models/user.js'
import { GraphQLError } from 'graphql'

const registerUser = async (parent, { register }, context, info) => {
    const { email, password, username, confirmPassword } = register
    if (confirmPassword !== password) {
        throw new GraphQLError('Please check and repeat correct password')
    }
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        throw new GraphQLError('User with this email exists. Please login')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { id: uuid(), email, username, password: hashedPassword }
    const created = await User.create(newUser);
    const accessToken = jwt.sign({ id: newUser.id, email: newUser.email, username: newUser.username }, process.env.JWT_ACCESS_SECRET, { expiresIn: '7d' })
    return { accessToken, id: newUser.id }
}

export default registerUser