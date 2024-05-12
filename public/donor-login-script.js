const email_input = document.getElementById('email-input');
const donorid_input = document.getElementById('donorid-input');
const password_input = document.getElementById('password-input');
const submitBtn = document.getElementById('submitBtn');


document.addEventListener('DOMContentLoaded', () => {
    submitBtn.addEventListener('click', loginUser);
})

const loginURL = 'http://localhost:8000/donors/login'

async function loginUser(e){
    e.preventDefault();

    const email = email_input.value;
    const donorid = donorid_input.value;
    const password = password_input.value;

    const res = await fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            donorid: donorid
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
        donorid_input.value = '';

        alert('Invalid password!');

    }
    else if (res.status = 404){
        email_input.value = '';
        password_input.value = '';
        donorid_input.value = '';

        alert('Invalid credentials / User not found!');
    }
}