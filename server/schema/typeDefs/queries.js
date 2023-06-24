const queries = `
  type Query {
    books (find: BookFilter): [Book]!
    authors (find: AuthorFilter): [Author]!
    user (find: UserFilter): User
  } 
`;

export default queries;