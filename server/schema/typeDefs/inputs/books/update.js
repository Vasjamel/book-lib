const updateInput = `
  input BookUpdate {
    id: String
    title: String
    author: String
    description: String
    year: Int
    image: String
    genre: [Genre]
  }
`
export default updateInput