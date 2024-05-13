
const queueBtn = document.getElementById('queueBtn');
const choice = document.getElementById('data-input');
const quantity = document.getElementById('quantity');
const list = document.getElementById('list');

document.addEventListener('DOMContentLoaded', () => {
    
    queueBtn.addEventListener('click', getInput);

})

var listCount = 0;
var beverages = 0;
var fruits = 0;
var veggies = 0;
var packaged = 0;

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

function submitList(){
    if (listCount == 0){
        alert('List is empty!');
        return;
    }
}