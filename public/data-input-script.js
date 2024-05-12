
const submitBtn = document.getElementById('submitBtn');
const choice = document.getElementById('data-input');
const quantity = document.getElementById('quantity');

document.addEventListener('DOMContentLoaded', () => {
    
    submitBtn.addEventListener('click', getInput);

})



function getInput(e) {

    e.preventDefault();


    const food = choice.value; 
    const amount = quantity.value;

    console.log(`${food}: ${amount}`)

}