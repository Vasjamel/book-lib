// import { GraphQLError } from 'graphql'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { v4 as uuid } from 'uuid'
// import users from '../../../../db/users.js'

// import User from '../../../../db/models/user.js'

// const registerUser = async (parent, { register }, context, info) => {

//   const newDBUser = await User.create({
//     id: uuid(),
//     username: 'vas',
//     email: 'vas@vas.vas',
//     password: await bcrypt.hash('1', 10)
//   })

//   console.log('newDBUser', newDBUser)
  
//   const userExists = users.find(user => user.email === register.email)
//   if (userExists) {
//     throw new GraphQLError('User is already registered with this email', {
//       extensions: {
//         code: 'UNAUTHENTICATED',
//         http: { status: 409 },
//       },
//     });
//   }

//   const encryptedPassword = await bcrypt.hash(register.password, 10)
  
//   const newUser = {
//     id: uuid(),
//     username: register.username,
//     email: register.email,
//     password: encryptedPassword,
//   }
//   const token = jwt.sign(newUser, process.env.LIB_ACCESS_TOKEN, { expiresIn: '7d' })
//   newUser.token = token
//   users.push(newUser)
//   return newUser
// }

// export default registerUser