
const queueBtn = document.getElementById('queueBtn');
const submitBtn = document.getElementById('submitBtn')
const choice = document.getElementById('data-input');
const quantity = document.getElementById('quantity');
const list = document.getElementById('list');

document.addEventListener('DOMContentLoaded', () => {
    
    queueBtn.addEventListener('click', getInput);
    submitBtn.addEventListener('click', submitList);

})

var listCount = 0;
var beverages = 0;
var fruits = 0;
var veggies = 0;
var packaged = 0;

const transactionURL = 'http://localhost:8000/transactions/insert'

// get the donations first and make a list.
// once done, submit it.
// makes it easier for users to add items while still being limited.
function getInput(e) {

    // limit the items by 5 pieces only
    if (listCount >= 5) {
        alert('List full!');
        return;
    }

    listCount++;

    e.preventDefault();
    
    // extract choices
    const food = choice.value; 
    const amount = parseInt(quantity.value);

    // save the amount of food first
    switch (food){
        case 'Packaged':

            packaged += amount;
            var item = document.createElement('li');
            var display = `Packaged/Canned goods: ${amount}`;
            item.innerHTML = display;

            console.log('Packaged goods' + amount)
            console.log('Node: ' + item.innerHTML);
            console.log('packaged: ' + packaged);

            list.appendChild(item);
            break;

        case 'Beverages':

            beverages += amount;
            var item = document.createElement('li');
            var display = `Beverages: ${amount}`;
            item.innerHTML = display;

            console.log('Beverages' + amount)
            console.log('Node: ' + item.innerHTML);
            console.log('beverages: ' + beverages);

            list.appendChild(item);
            break;

        case 'Veggies':

            veggies += amount;
            var item = document.createElement('li');
            var display = `Veggies: ${amount}`;
            item.innerHTML = display;

            console.log('Veggies' + amount)
            console.log('Node: ' + item.innerHTML);
            console.log('veggies: ' + veggies);

            list.appendChild(item);
            break;

        case 'Fruits':

            fruits += amount;
            var item = document.createElement('li');
            var display = `Fruits: ${amount}`;
            item.innerHTML = display;

            console.log('Fruits' + amount)
            console.log('Node: ' + item.innerHTML);
            console.log('fruits: ' + fruits);

            list.appendChild(item);
            break;
    }
}


// submit the list.
// turn the list into json and pass it into backend.
// backend will receive and use the session to determine who it belongs to.
async function submitList(){
    if (listCount == 0){
        alert('List is empty!');
        return;
    }

    const res = await fetch(transactionURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            beverages: beverages,
            fruits: fruits,
            veggies: veggies,
            packaged: packaged,
        })
    }).then(() => {

        alert('Thank you for your generous donation!');
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

    });

}