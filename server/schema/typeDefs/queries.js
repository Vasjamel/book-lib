const queries = `
  type Query {
    books (find: BookFilter): [Book]!
    authors (find: AuthorFilter): [Author]!
    users (find: UserFilter): [User]
  } 
`;

export default queries;