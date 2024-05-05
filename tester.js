
const Database = require('./dbController');


const db = new Database();

const name = 'Jems';
const pass = 'jems';
const phone = '123';
const email = 'email@email'

const emp = 'employee1';
const password = 'emp123';
const employeeID = '12345';


db.Employee_insert(emp, password, employeeID);