


//======== GET ALL BOOKING HISTORIES ========


thePath = window.location.pathname;
const email = thePath.substring(thePath.lastIndexOf('/')+1)


const myUrl = `http://localhost:5002/select/booking/${email}`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};


fetch(myUrl, requestOptions)
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

function fillTbody(item, index){
    const tbody = document.querySelector('.tbody')
    console.log(item.activity);

    // === CREATE TR ===
    let tr = document.createElement('tr')
    tr.setAttribute('align','center');
    tbody.appendChild(tr);

// === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.activity;
    tr.appendChild(th1);

// === CREATE TH ===
    let th2 = document.createElement('th');
    th2.textContent = item.datetime;
    tr.appendChild(th2);

// === CREATE TH ===
    let th3 = document.createElement('th');
    th3.textContent = item.paid;
    tr.appendChild(th3);

// // === CREATE TH ===
//     let td = document.createElement('td');
//     tr.appendChild(td)
//
//
// // === CREATE ATAG ===
//     let a = document.createElement('a');
//     a.className = "mt-3 w-75 btn btn-info"
//     a.textContent = "Rediger"
//     a.href = "/booking/history/"+item.id;
//     td.appendChild(a);

// === CREATE TH ===

// === CREATE DIV ===
//     let div = document.createElement("div")
//     div.className = "col-sm-4"
//     activitySelector.appendChild(div);
//
// // === CREATE ATAG ===
//     let aTag = document.createElement('a')
//     aTag.href = item.activity_id;
//     div.appendChild(aTag);
//
// // === CREATE IMAGE TAG ===
//     let img = document.createElement("img")
//     img.src = item.activity_pic;
//     aTag.appendChild(img);
//
// // === CREATE H2 TAG ===
//     let h2 = document.createElement("h2")
//     h2.textContent = item.activity_name;
//     div.appendChild(h2);
}