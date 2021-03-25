const thisForm = document.getElementById('bookingForm');
const termsOfUse = document.getElementById('termsOfUse');
const price  = document.getElementById('price');

// ============== EVENT LISTENER ==============

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()

    if(!termsOfUse.checked){
        document.getElementById('missingCheckbox').innerHTML = "Accepter Bruger betingelserne før booking";
    } else if(termsOfUse.checked){
        const response = await fetch('http://localhost:5002/insert/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        window.location.href = "/"
        const result = await response.json();
        console.log(result)

    }

});

// ============== GET ACTIVITY ==============

const mail = "and@and";
const myUrl = `http://localhost:5002/select/activities`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotActivityData(data)
    })

function gotActivityData(data){
    data.forEach(fillDropDown)

}

// ============== FILL DROPDOWN ==============

function fillDropDown(item, index){
    const activitySelector = document.querySelector('.activiySelector')

    let el = document.createElement("option");
    el.textContent = item.name;
    console.log("ITEM=====",item.name)
    el.value = item.name;
    activitySelector.appendChild(el);
}

// ============== GET PRICE ==============

function myPrice(chosen) {
    const activityUrl = `http://localhost:5002/select/activity/${chosen}`;

    const activityRequestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(activityUrl, activityRequestOptions)
        .then(response => response.json())
        .then(data => {
            document.getElementById("activityPrice").innerHTML="<p> Prisen er:"+ data.price + "</p>"
            document.getElementById('insertActivityPrice').value = data.price
            console.log(data)
        })
}

