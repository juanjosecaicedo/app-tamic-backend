const Sequelize = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();
const db = {};
const sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,     
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        operatorsAliases: false,    
        timezone: '-05:00'
        // pool: {
        //     max: 5,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        // },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;orts = db;