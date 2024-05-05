const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
require('dotenv').config()


hostname = process.env.DB_HOST;
user = process.env.DB_USER;
pass = process.env.DB_PASSWORD;
db = process.env.DB_DATABASE;
port = process.env.DB_PORT;


sequelize = new Sequelize(
    db, user, pass,
    {
        host: hostname,
        dialect: 'mysql'
    }
);

// authenticate
sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

// define employee model
Employee = sequelize.define('employees', {
    employee: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log('Tables created sucessfully');
}).catch((error)=> {
    console.error('Unable to create tables.', error);
})