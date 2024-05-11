
const Sequelize = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');
require('dotenv').config()

class DBController {

    #hostname;
    #user;
    #pass;
    #db;
    #port;
    #sequelize;
    #User;
    #Employee;
    

    constructor(){
       
        this.#hostname = process.env.DB_HOST;
        this.#user = process.env.DB_USER;
        this.#pass = process.env.DB_PASSWORD;
        this.#db = process.env.DB_DATABASE;
        this.#port = process.env.DB_PORT;


        this.#sequelize = new Sequelize(
            this.#db, this.#user, this.#pass,
            {
                host: this.#hostname,
                dialect: 'mysql'
            }
        );

        // authenticate
        this.#sequelize.authenticate().then(() => {
            console.log('Database connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });


        // define the user model
        this.#User = this.#sequelize.define('user', {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            donorID: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });


        // define employee model
        this.#Employee = this.#sequelize.define('employees', {
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
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            employeeID: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        this.#sequelize.sync().then(() => {
            console.log('Tables created sucessfully');
        }).catch((error)=> {
            console.error('Unable to create tables.', error);
        })

    }

    // insert a User
    async User_insert(donFirst, donLast, donPass, donEmail, donID) {
        this.#sequelize.sync();

        await this.#User.create({
            donorFirst: donFirst,
            donorLast: donLast,
            donorPassword: donPass,
            donorEmail: donEmail,
            donorID: donID

        }).then(() => {
            console.log(`User ${user} added.`);
        });
    };

    // retrieve a User
    async User_select(donEmail, donPass) {
        this.#sequelize.sync();

        let result = await this.#User.findOne({
            where: {
                donorEmail: donEmail,
                donorPassword: donPass
            },
            raw: true
        }).catch((error) => {
            console.log('Failed to retrieve data', error);
        });

        if (!result) {
            console.log('No user detected!');
            return {detected: false, res: null};
        }
        else {
            console.log(`User retrieved: ${result.username}`);
            return {detected: true, res: result};
        }
    };

    // insert an Employee
    async Employee_insert(empFirst, empLast, empPass, empEmail, empID) {
        this.#sequelize.sync();

        await this.#Employee.create({
            employeeEmail: empEmail,
            employeePassword: empPass,
            employeeID: empID,
            employeeFirst: empFirst,
            employeeLast: empLast

        }).then(() => {
            console.log(`User ${user} added.`);
        });
    };

    // retrieve an Employee
    async Employee_select(empEmail, empPass, empID) {
        this.#sequelize.sync();

        let result = await this.#Employee.findOne({
            where: {
                employeeEmail: empEmail,
                employeePassword: empPass,
                employeeID: empID
            },
            raw: true
        }).catch((error) => {
            console.log('Failed to retrieve data', error);
        });

        if (!result) {
            console.log('No user detected!');
            return {detected: false, res: null};
        }
        else {
            console.log(`User retrieved: ${result.username}`);
            return {detected: true, res: result};
        }
    };
    
}


module.exports = DBController;