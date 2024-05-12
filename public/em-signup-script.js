const employeeID_output = document.getElementById('employeeId');
const first_input = document.getElementById('firstName-input');
const last_input = document.getElementById('lastName-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');

document.getElementById("check").required = true;

document.addEventListener('DOMContentLoaded', () => {

    employeeID_output.value = generateEmployeeId();

    submitBtn.addEventListener('click', getCredentials);

})


const signupURL = 'http://localhost:8000/employees/signup'

// Function to generate employee ID
function generateEmployeeId() {
    // Generate a random string of 6 characters
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var employeeId = '';
    for (var i = 0; i < 6; i++) {
        employeeId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return employeeId;
}

// get credentials from input fields.
// then pass it to backend for processing.
async function getCredentials(e) {
    e.preventDefault();

    const firstName = first_input.value;
    const lastName = last_input.value;
    const email = email_input.value;
    const password = password_input.value;
    const employeeId = employeeID_output.value;

    // check if fields are empty
    if (firstName == '' || lastName == '' || email == '' || password == '') {
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
            employeeId: employeeId
        })
    })

    // report
    if (res.status == 300) {
        first_input.value = '';
        last_input.value = '';
        email_input.value = '';
        password_input.value = '';
        employeeID_output.value = '';

        alert('Signup success!');
    }


}

