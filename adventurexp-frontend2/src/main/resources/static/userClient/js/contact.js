const thisForm = document.getElementById('contactForm');
const fornavn = document.getElementById('Fornavn');
const efternavn = document.getElementById('Efternavn');
const email = document.getElementById('E-mail');
const beskrivelse = document.getElementById('Beskrivelse');

//======= EVENT LISTERNER =======================

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();


    fetch('http://localhost:5002/insert/ticket', {
        method: 'POST',
        body: JSON.stringify({
            'firstname'       : fornavn.value,
            'lastname'        : efternavn.value,
            'mail'            : email.value,
            'context'         : beskrivelse.value,
            'ticket_taken'    : 0,
            'ticket_active'   : 1
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        window.location.href = "/"
        console.log(data)
    }).catch(function (error) {
        console.warn('Something went wrong.', error);


    });
});