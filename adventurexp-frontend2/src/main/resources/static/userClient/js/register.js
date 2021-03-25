const thisForm  = document.getElementById('registerForm');
const mail      = document.getElementById('email');
const password  = document.getElementById('password')
const password2  = document.getElementById('confirm_password');
const firstname = document.getElementById('firstname');
const lastname  = document.getElementById('lastname');
const phone     = document.getElementById('phone');

//     === EVENT LISTENER ===

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if(password2.value != password.value){
        console.log("test")
        document.getElementById('passwordValid').innerHTML = "Password skal være ens!";
    }else if(password.value == password2.value){

        const myUrl = `http://localhost:5002/select/user/${mail.value}`;

        const requestOptions = {
            'content-type': 'application/json',
            method: 'GET',
            redirect: 'follow'
        };


        fetch(myUrl, requestOptions)
            .then(response => response.json())

            .then(data => {
                console.log(data)
                console.log("findes allerede")
                document.getElementById('alreadyExists').innerHTML = "Bruger Eksistere allerede";


            }).catch(async function(){
            console.log("Findes ikke")
            await insertUser();
            await insertAuth();
            window.location.href = "/login"
        })

    }
});

//     === INSERT USER ===

async function insertUser(){
    await fetch('http://localhost:5002/insert/user',{
        method: 'POST',
        body: JSON.stringify({
            'enabled'   : 1,
            'mail'      : mail.value,
            'password'  : password.value,
            'role'      : 'ROLE_USER'
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
        // thisForm.submit();
        console.log(data)
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    })
}
//     === INSERT AUTH ===

async function insertAuth(){
    await fetch('http://localhost:5002/insert/auth',{
        method: 'POST',
        body: JSON.stringify({
            'mail'  : mail.value,
            'role'  : 'ROLE_USER'
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
        // thisForm.submit();
        console.log(data)
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    })
}