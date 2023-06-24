import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'

const checkToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, data) => {
        if (err) {
            throw new GraphQLError('Unathenticated token', { extensions: { code: 'UNATHENTICATED' } })
        }
        return data
    })

}

export default checkToken