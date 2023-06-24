import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../../../../db/models/user.js'
import { GraphQLError } from 'graphql'

const login = async (parent, { login }, context, info) => {
    const { email, password, username } = login
    const user = await User.findOne({ where: { email } })
    if (!user) {
        throw new GraphQLError('Email or password is incorrect')
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        throw new GraphQLError('Email or password is incorrect')
    }
    const accessToken = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
    return { accessToken, refreshToken }
}

export default login