const getBtn = document.getElementById('get-btn');



document.addEventListener('DOMContentLoaded', () => {

    getBtn.addEventListener('click', get);

})


getURL = 'http://localhost:8000/transactions/get-transactions';

async function get() {

    const res = await fetch(getURL, {
        method: 'GET'
    })

    console.log(res);
    const result = await res.json();

    result.array.forEach(element => {
        console.log(element);
    });

}