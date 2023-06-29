const mutations = `
  type Mutation {
    createBook (input: BookInput): Book
    createAuthor (input: AuthorInput): Author
    deleteAuthor (find: AuthorFilter): Author
    deleteBook (find: BookFilter): Book
    updateBook (find: BookFilter, input: BookInput): Book
    updateAuthor (find: AuthorFilter, input: AuthorInput): Author
    registerUser (register: UserRegister): Login
    loginUser (login: UserLogin): Login
    deleteUser (find: UserFilter): User
  }
`

export default mutations