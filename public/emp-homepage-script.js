const list = document.getElementById('list');
const userList = document.getElementById('user-list');

document.addEventListener('DOMContentLoaded', () => {
    //getBtn.addEventListener('click', getAll);
    getAllUsers();
    getAll();

})

getURL = 'http://localhost:8000/transactions/getAll-transactions';
getUsers = 'http://localhost:8000/donors/getAll';


// function to get all of the transaction done by the donor
async function getAll(){
    //e.preventDefault();

    const res = await fetch(getURL, {
        method: 'GET'
    });

   // console.log(res);

    // use var or let variable types to catch promises ffs.
    // otherwise value will not change.
    // lost 3 hrs for this nonsense. jesus
    var trans = await res.json();
    console.log(trans) ;

    // create a list item per retrieved transaction.
    trans.forEach(element => {
        console.log(element);
        const text = `Veggies: ${element.veggies}  |  Fruits: ${element.fruits}  |  Beverages: ${element.beverages}  | 
                        Packaged goods: ${element.packaged}\n
                        Transaction done at: ${element.createdAt}\n
                        By: ${element.userId}`;
        
        var node = document.createElement('li');
        node.innerHTML = text;
        node.style = 'border: #6927IE 1px solid';

        list.appendChild(node);
    });

   // const transaction = await res.json().value;

   // console.log(transaction);
}


// get all donors
async function getAllUsers() {

    const res = await fetch(getUsers, {
        method: 'GET'
    });

   // console.log(res);

    var users = await res.json();
    console.log(users) ;

    users.forEach(element => {
        console.log(element);
        const text = `First: ${element.donorFirst}  |  Last: ${element.donorLast}  |  Email: ${element.donorEmail}  | 
                        ID: ${element.id}\n`;
        
        var node = document.createElement('li');
        node.innerHTML = text;
        node.style = 'border: #6927IE 1px solid';

        userList.appendChild(node);
    });
}