import sequelize from "../index.js";
import Author from "./author.js";
import Book from "./book.js";

Book.belongsTo(Author)
Author.hasMany(Book)

try {
    await sequelize.sync()
} catch (error) {
    console.error({ error })
}

export default {
    Author,
    Book,
};