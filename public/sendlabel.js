
const submitBtn = document.getElementById('submitBtn');
const choice = document.getElementById('data-input');
const quantity = document.getElementById('quantity');

document.addEventListener('DOMContentLoaded', () => {
    
    submitBtn.addEventListener('click', label);
})



function label() {
    var label = document.createElement('label');
    label.innerHTML = `${choice.value}: ${quantity.value}\n`;

    var labelDiv = document.getElementById('label-here');

    labelDiv.appendChild(label);
}