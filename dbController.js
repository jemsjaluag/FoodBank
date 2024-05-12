
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
            donorFirst: {
                type: DataTypes.STRING,
                allowNull: false
            },
            donorLast: {
                type: DataTypes.STRING,
                allowNull: false
            },
            donorPassword: {
                type: DataTypes.STRING,
                allowNull: false
            },
            donorEmail: {
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
    async User_insert(donorCreds) {
        this.#sequelize.sync();

        console.log('Donor:');
        console.log(donorCreds);

        
        await this.#User.create({
            donorFirst: donorCreds.donFirst,
            donorLast: donorCreds.donLast,
            donorPassword: donorCreds.donPass,
            donorEmail: donorCreds.donEmail,
            donorID: donorCreds.donId

        }).then(() => {
            console.log(`User ${donorFirst} added.`);
        });
        
        // report
        

    };

    // look for a Donor with an email
    async User_findUser(donEmail) {
        this.#sequelize.sync();

        let result = await this.#User.findOne({
            where: {
                donorEmail: donEmail,
            },
            raw: true
        }).catch((error) => {
            console.log('Failed to retrieve data', error);
        });

        if (!result) {
            console.log('No user detected!');
            return {detected: false};
        }
        else {
            console.log(`User with the email ${donEmail} exists!`);
            return {detected: true};
        }

    };

    // retrieve a User
    async User_select(donEmail) {
        this.#sequelize.sync();

        let result = await this.#User.findOne({
            where: {
                donorEmail: donEmail,
            },
            raw: true
        }).catch((error) => {
            console.log('Failed to retrieve data', error);
        });

        if (!result) {
            console.log('No user detected!');
            return {detected: false};
        }
        else {
            console.log(`User with the email ${donEmail} exists!`);
            return {detected: true,
                    password: result.password,
                    donorid: result.donorID };
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

    // close all connections
    async closeConnection(){
        await this.#sequelize.close();
    }
    
}


module.exports = DBController;