const donorID_output = document.getElementById('donorId');
document.getElementById("check").required = true;


document.addEventListener('DOMContentLoaded', () => {
    donorID_output.value = generateDonorId();
    
})





// Function to generate donor ID
function generateDonorId() {
    // Generate a random string of 6 characters
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var donorId = '';
    for (var i = 0; i < 6; i++) {
        donorId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return donorId;
}

// Set generated employee ID to input field
//document.getElementById('donorId').value = generateDonorId();
document.getElementById("check").required = true;