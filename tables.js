const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
require('dotenv').config()


hostname = process.env.DB_HOST;
user = process.env.DB_USER;
pass = process.env.DB_PASSWORD;
db = process.env.DB_DATABASE;
port = process.env.DB_PORT;


var sequelize = new Sequelize(
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

 // define the user model
 User = sequelize.define('user', {
    donorEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donorPassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donorFirst: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donorLast: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donorID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// define employee model
Employee = sequelize.define('employees', {
    employeeEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeFirst: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeLast: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeePassword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeID: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Transactions = sequelize.define('transactions', {
    packaged: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    fruits: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    veggies: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    beverages: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})


User.hasMany(Transactions);
Transactions.belongsTo(User);

sequelize.sync( {force: true} ).then(() => {
    console.log('Tables created sucessfully');
}).catch((error)=> {
    console.error('Unable to create tables.', error);
})