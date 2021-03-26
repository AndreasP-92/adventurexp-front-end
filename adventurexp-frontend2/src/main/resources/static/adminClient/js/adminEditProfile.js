//======== FETCH MAIL ========

thePath = window.location.pathname;
const urlId = thePath.substring(thePath.lastIndexOf('/')+1)

const myUrl = `http://localhost:5002/select/one/profile/${urlId}`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotOneMailData(data)
        console.log(data)
    })


//======== PRINT MAIL ========
function gotOneMailData(data){
    document.getElementById('email').value = data.mail;
    document.getElementById('id').value = data.id;
    document.getElementById('firstname').value = data.firstname;
    document.getElementById('lastname').value = data.lastname;
    document.getElementById('phone').value = data.phone;
    document.getElementById('role').value = data.role;
    document.getElementById('password').value =data.password;
    document.getElementById('phone').value = data.phone;
    console.log('data======',data.mail)
}



const thisForm  = document.getElementById('adminRegisterForm');
const firstname = document.getElementById('firstname');
const lastname  = document.getElementById('lastname');
const email     = document.getElementById('email');
const password  = document.getElementById('password');
const password2  = document.getElementById('confirm_password');
const phone     = document.getElementById('phone');
const role      = document.getElementById('role');
const id        = document.getElementById('id');



//======= EVENT LISTERNER =======================

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (password2.value != password.value) {
        document.getElementById('passwordValid').innerHTML = "Password skal være ens!";
    } else if (password.value == password2.value) {
        fetch('http://localhost:5002/edit/profile', {
            method: 'POST',
            body: JSON.stringify({
                'firstname': firstname.value,
                'lastname': lastname.value,
                'mail': email.value,
                'password': password.value,
                'phone': phone.value,
                'role': role.value,
                'id': id.value
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
            // window.location.href = "/admin/index"
            console.log(data)
        }).catch(function (error) {
            console.warn('Something went wrong.', error);


        });
    };
});