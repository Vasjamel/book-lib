import { DataTypes } from 'sequelize'
import sequelize from '../index.js'

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export default Author