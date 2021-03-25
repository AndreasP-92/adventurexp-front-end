//======== GET ALL BOOKING HISTORIES ========

thePath = window.location.pathname;
const email = thePath.substring(thePath.lastIndexOf('/')+1)


const bookingIndexUrl = 'http://localhost:5002/select/active/booking';

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};


fetch(bookingIndexUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        data.forEach(fillTbody)
        console.log(data)
    })

function gotActivityData(data) {
    console.log('activities====', data)
    const activitiesMap = data.map(dd => dd);
    console.log('activitiesMap====', activitiesMap)
    // activitiesMap.forEach(fillDropDown)
}


function fillTbody(item, index) {
    const tbody = document.querySelector('.tbody')
    console.log(item.activity);

    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbody.appendChild(tr);

// === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.firstname;
    tr.appendChild(th1);

// === CREATE TH ===
    let th2 = document.createElement('th');
    th2.textContent = item.activity;
    tr.appendChild(th2);

// === CREATE TD ===
    let td = document.createElement('td');
    td.textContent = item.datetime;
    tr.appendChild(td);

// === CREATE TD ===
    let td2 = document.createElement('td');
    td2.textContent = item.duration;
    tr.appendChild(td2);

    // === CREATE ATAG ===
    let button = document.createElement('button');
    button.className = "mt-3 w-75 btn btn-danger"
    button.textContent = "Luk Booking"
    button.href = "/booking/history/"+item.id;
    tr.appendChild(button);

}