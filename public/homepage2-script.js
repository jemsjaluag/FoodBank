const getBtn = document.getElementById('get-btn');
const list = document.getElementById('list');



document.addEventListener('DOMContentLoaded', () => {
    getBtn.addEventListener('click', getAll);
})

getURL = 'http://localhost:8000/transactions/get-transactions';

async function getAll(e){
    e.preventDefault();

    const res = await fetch(getURL, {
        method: 'GET'
    });

    console.log(res);

    // use var or let variable types to catch promises ffs.
    // otherwise value will not change.
    // lost 3 hrs for this nonsense. jesus
    var trans = await res.json();
    console.log(trans) ;

    trans.forEach(element => {
        console.log(element);
        const text = `Veggies: ${element.veggies}  |  Fruits: ${element.fruits}  |  Beverages: ${element.beverages}  | 
                        Packaged goods: ${element.packaged}\n
                        Transaction done at: ${element.createdAt}`;
        
        var node = document.createElement('li');
        node.innerHTML = text;
        node.style = 'border: #6927IE 1px solid';

        list.appendChild(node);
    });

   // const transaction = await res.json().value;

   // console.log(transaction);
}