const donorID_output = document.getElementById('donorId');
const first_input = document.getElementById('firstName-input');
const last_input = document.getElementById('lastName-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');

document.getElementById("check").required = true;


document.addEventListener('DOMContentLoaded', () => {

    donorID_output.value = generateDonorId();

    submitBtn.addEventListener('click', getCredentials);
    
})


const signupURL = 'http://localhost:8000/donors/signup'


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

// get credentials from input fields.
// then pass it to backend for processing.
async function getCredentials(e) {
    e.preventDefault();

    const firstName = first_input.value;
    const lastName = last_input.value;
    const email = email_input.value;
    const password = password_input.value;
    const donorId = donorID_output.value;

    // check if fields are empty
    if (firstName == '' || lastName == '' || email == '' || password == '' ) {
        alert('Some fields are empty.');
        first_input.value = ''; last_input.value = ''; email_input.value = ''; password_input = '';
        return;
    }

    const res = await fetch(signupURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            donorId: donorId
        })
    })

    // report
    if (res.status == 300){
        first_input.value = '';
        last_input.value = '';
        email_input.value = '';
        password_input.value = '';
        donorID_output.value = '';



        alert('Signup success!');
    }


}

