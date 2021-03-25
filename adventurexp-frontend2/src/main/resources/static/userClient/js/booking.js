const thisForm = document.getElementById('bookingForm');
const termsOfUse = document.getElementById('termsOfUse');

// ============== POST BOOKING ==============

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

// ============== DROPDOWN MENU ==============

function fillDropDown(item, index){
    const activitySelector = document.querySelector('.activiySelector')

    let el = document.createElement("option");
    el.textContent = item.name;
    console.log("ITEM=====",item.name)
    el.value = item.name;
    activitySelector.appendChild(el);
}

// ============== SHOW PRICE ON BOOKING ==============

function myPrice(chosen) {
    console.log(chosen)
    const mail = "and@and";
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
            console.log(data)
        })
}

