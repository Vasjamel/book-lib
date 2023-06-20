// import { GraphQLError } from 'graphql'

// const userQuery = (parent, { find = {} }, context) => {
//   const argsKeys = Object.entries(find)
//   if (!argsKeys.length) {
//     throw new GraphQLError('Please provide user details', {
//       extensions: {
//         code: 'UNAUTHENTICATED',
//         http: { status: 400 },
//       },
//     });
//   }

//   return users.find(user => argsKeys.every(([key, value]) => user[key] === value))
// }

// export default userQuery