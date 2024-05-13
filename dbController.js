
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
    #Transactions;
    

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
                dialect: 'mysql',
                logging: false
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
            employeePassword: {
                type: DataTypes.STRING,
                allowNull: false
            },
            employeeID: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });

        this.#Transactions = this.#sequelize.define('transactions', {
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

        // on-to-many association
        this.#User.hasMany(this.#Transactions);
        this.#Transactions.belongsTo(this.#User);


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
            console.log(`User ${donorCreds.donFirst} added.`);
        });
        
        // report
        

    };

    // look for a Donor with an email
    async User_findUser(donEmail, donorid) {
        this.#sequelize.sync();

        let result = await this.#User.findOne({
            where: {
                donorEmail: donEmail,
                donorID: donorid
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
    async User_select(donEmail, donorid) {
        this.#sequelize.sync();

        let result = await this.#User.findOne({
            where: {
                donorEmail: donEmail,
                donorID: donorid
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
                    password: result.donorPassword,
                    donorid: result.donorID,
                    id: result.id,
                    first: result.donorFirst };
        }

    };

    // just get all of the transaction records
    async User_getAll() {

        this.#sequelize.sync();
        const res = await this.#User.findAll({
            raw: true,
            subQuery: false
        }).then((result) => {
            console.log('Got all!');
            return result;
        })

        if (res)    {return res;}
        else        {console.log('No transactions extracted.')};
    }

    // insert an Employee
    async Employee_insert(employee) {
        this.#sequelize.sync();

        await this.#Employee.create({
            employeeEmail: employee.empEmail,
            employeePassword: employee.empPass,
            employeeID: employee.empId,
            employeeFirst: employee.empFirst,
            employeeLast: employee.empLast

        }).then(() => {
            console.log(`User ${employee.empEmail} added.`);
        });
    };

    // look for an Employee with an email
    async Employee_findUser(empEmail, empid) {
        this.#sequelize.sync();

        let result = await this.#Employee.findOne({
            where: {
                employeeEmail: empEmail,
                employeeID: empid
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
            console.log(`User with the email ${empEmail} exists!`);
            return {detected: true};
        }
    };

    // retrieve an Employee
    async Employee_select(empEmail, empID) {
        this.#sequelize.sync();

        let result = await this.#Employee.findOne({
            where: {
                employeeEmail: empEmail,
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
            console.log(`User retrieved: ${result.employeeEmail}`);
            return {detected: true,
                    password: result.employeePassword,
                    employeeid: result.employeeID,
                    id: result.id,
                    first: result.employeeFirst};
        }
    };


    // Transaction
    async Transaction_insert(transaction, userid){
        this.#sequelize.sync();

        await this.#Transactions.create({
            packaged: transaction.packaged,
            fruits: transaction.fruits,
            veggies: transaction.veggies,
            beverages: transaction.beverages,
            userId: userid
        }, { 
            include: this.#User
        },
        ).then(() => {
            console.log(`Transaction added.`);
        });
    }

    async Transaction_get(userid) {
        this.#sequelize.sync();
        const res = await this.#Transactions.findAll({
            where: {
                userId: userid
            },
            raw: true,
            subQuery: false

        }).then((result) => {
            console.log('Success!');
            return result;
        })

        if (res)    {return res;}
        else        {console.log('No transactions extracted.')};
    }

    // just get all of the transaction records
    async Transaction_getAll() {

        this.#sequelize.sync();
        const res = await this.#Transactions.findAll({
            raw: true,
            subQuery: false
        }).then((result) => {
            console.log('Got all!');
            return result;
        })

        if (res)    {return res;}
        else        {console.log('No transactions extracted.')};
    }

    // close all connections
    async closeConnection(){
        await this.#sequelize.close();
    }
    
}


module.exports = DBController;