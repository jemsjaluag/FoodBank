
const submitBtn = document.getElementById('submitBtn');
const choice = document.getElementById('data-input');
const quantity = document.getElementById('quantity');

document.addEventListener('DOMContentLoaded', () => {
    
    submitBtn.addEventListener('click', label);
})



function label() {

    // label -> labelDiv -> labels
    var label = document.createElement('label');
    label.style.fontSize = '17px';
    label.innerHTML = `${choice.value}: ${quantity.value}\n`;

    var labelDiv = document.createElement('div');
    labelDiv.appendChild(label);

    var labels = document.getElementById('label-here');

    labels.appendChild(labelDiv);
}