//======== PROFILEABOUT ========

const thisForm = document.getElementById('profileAboutForm');
const password1 = document.getElementById('newPass');
const password2 = document.getElementById('repeatPass');

//======== EVENT LISTENER ========
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if(password1.value != password2.value){
        console.log("test")
        document.getElementById('passwordValid').innerHTML = "Password skal være ens!";
    }else if(password1.value == password2.value){
        const formData = new FormData(thisForm).entries()
        const response = await fetch('http://localhost:5002/update/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        window.location.href = "/";
        const result = await response.json();
        console.log(result)
    }

});

//======== FETCH MAIL ========

thePath = window.location.pathname;
const email = thePath.substring(thePath.lastIndexOf('/')+1)

const myUrl = `http://localhost:5002/select/user/${email}`;

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
    document.getElementById('mail').value = data.mail;
    document.getElementById('id').value = data.id;
    console.log('data======',data.mail)

}



