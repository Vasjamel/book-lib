import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_IP,
    dialect: 'postgres'
})

try {
    await sequelize.authenticate();
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize