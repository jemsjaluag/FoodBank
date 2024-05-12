
const Database = require('./dbController');


const db = new Database();

const name = 'Jems';
const last = 'Jams';
const pass = 'jems';
const email = 'james@email'
const donorid = '12111'

const empEmail = 'employee1@mail.com';
const empfirst = 'empFirst';
const emplast = 'empLast';
const password = 'emp123';
const employeeID = '12345';


db.Employee_insert(employee, password, employeeID);