const thisForm = document.getElementById('profileAboutForm');
alert("test")
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()
    const response = await fetch('http://localhost:5002/insert/profile/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
    });

    const result = await response.json();
    console.log(result)
});

thePath = window.location.pathname;
const email = thePath.substring(thePath.lastIndexOf('/')+1)

const myUrl = `http://localhost:5002/select/one/profile/about/${email}`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotOneMailData(data)
    })

function gotOneMailData(data){
    console.log('mail====',data)
    const mail = data.map(dd => dd.mail);
    console.log('activitiesMap====',mail)
    mail.forEach(fillDropDown)
    document.getElementById('mail').value = mail;
}

function fillDropDown(item, index){
    const user_mailSelector = document.querySelector('.user_mailSelector')

    let el = document.createElement("option");
    el.textContent = item;
    console.log("ITEM=====",item)
    el.value = item;
    user_mailSelector.appendChild(el);
}


