const thisForm  = document.getElementById('registerForm');
const mail      = document.getElementById('email');
const password  = document.getElementById('password')
const password2  = document.getElementById('confirm_password');
const firstname = document.getElementById('firstname');
const lastname  = document.getElementById('lastname');
const phone     = document.getElementById('phone');

// alert("test")
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    // const formData = new FormData(thisForm).entries()
    // const formData2 = new FormData(thisForm).entries()
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
    // await insertProfile(formData)
    // await  insertUser(formData2)



});

async function insertUser(){
    await fetch('http://localhost:5002/insert/user',{
        method: 'POST',
        body: JSON.stringify({
            'enabled'   : 1,
            'mail'      : mail.value,
            'password'  : password.value
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