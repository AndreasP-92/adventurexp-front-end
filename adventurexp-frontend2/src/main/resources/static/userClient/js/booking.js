const thisForm = document.getElementById('bookingForm');
const termsOfUse = document.getElementById('termsOfUse');

alert("test")
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

        const result = await response.json();
        console.log(result)
    }

});
const mail = "and@and";
const myUrl = `http://localhost:5002/select/activities/`;

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
    console.log('activities====',data)
    const activitiesMap = data.map(dd => dd.name);
    console.log('activitiesMap====',activitiesMap)
    activitiesMap.forEach(fillDropDown)

}

function fillDropDown(item, index){
    const activitySelector = document.querySelector('.activiySelector')

    let el = document.createElement("option");
    el.textContent = item;
    console.log("ITEM=====",item)
    el.value = item;
    activitySelector.appendChild(el);
}



// .then(response => {
//     console.log(response.json())
//     return  response.status + response.statusText;
//     //return response.statusText;
//
// }).catch(err => {console.log("err="+err); return "fejl";})
// .then(alert);