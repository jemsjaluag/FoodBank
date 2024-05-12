const employeeID_input = document.getElementById('employee-id');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const submitBtn = document.getElementById('submit-btn');


document.addEventListener('DOMContentLoaded', () => {

    submitBtn.addEventListener('click', loginUser);
})


const loginURL = 'http://localhost:8000/employees/login'


async function loginUser(e){
    e.preventDefault();

    const email = email_input.value;
    const employeeid = employeeID_input.value;
    const password = password_input.value;

    const res = await fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            employeeid: employeeid
        })
    })

    // report
    if (res.status == 300){

        // replace window with the homepage.
        // sort of a 'redirect' to a link.
        // done from the client side / front end.
        window.location.href = `http://localhost:8000/donors/homepage`
    }
    else if (res.status == 403){
        email_input.value = '';
        password_input.value = '';
        employeeID_input.value = '';

        alert('Invalid password!');

    }
    else if (res.status = 404){
        email_input.value = '';
        password_input.value = '';
        employeeID_input.value = '';

        alert('Invalid credentials / User not found!');
    }
}

