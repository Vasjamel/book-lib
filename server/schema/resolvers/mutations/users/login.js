// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { GraphQLError } from 'graphql'

// import users from '../../../../db/users.js'

// const throwAuthError = () => {
//   throw new GraphQLError('Incorrect email or password', {
//     extensions: {
//       code: 'UNAUTHENTICATED',
//       http: { status: 401 },
//     },
//   });
// }

// const loginUser = async (parent, { login }, context, info) => {
//   const user = users.find(usr => usr.email === login.email)
//   if (!user) {
//     throwAuthError()
//   }

//   const isCorrectPassword = await bcrypt.compare(login.password, user.password)
  
//   if (!isCorrectPassword) {
//     throwAuthError()
//   }
//   const token = jwt.sign(user, process.env.LIB_ACCESS_TOKEN, { expiresIn: '7d' })
//   user.token = token
//   return user
// }

// export default loginUser