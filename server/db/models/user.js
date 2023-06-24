import { DataTypes } from 'sequelize'
import sequelize from '../index.js'

const LibUser = sequelize.define('LibUser', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

await LibUser.sync()

export default LibUser