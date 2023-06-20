import { DataTypes } from 'sequelize'
import sequelize from '../index.js'
const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
})

export default Book