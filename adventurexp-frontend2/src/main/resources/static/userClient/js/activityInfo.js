//======== GET ONE ACTIVITY ========


thePath = window.location.pathname;
const name = thePath.substring(thePath.lastIndexOf('/')+1)


const myUrl = `http://localhost:5002/select/activities/${name}`;

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

function fillActivityHeader(item, index) {
    const HeaderParent = document.querySelector('.ActivityHeader')
    console.log(item.activity);

    // === CREATE h3 ===
    let h3 = document.createElement('h3')

    // === CREATE h4 ===

}

function fillBreadTextParent(item, index){
    const BreadParent = document.querySelector('.breadText')
    const duration = document.querySelector('.duration')
    const price = document.querySelector('.price')
    const pinfo = document.querySelector('.pinfo')




    // === CREATE ptag ===
    let p = document.createElement('p')
    BreadParent.appendChild(p)

    // === CREATE ptag ===
    let p1 = document.createElement('p')
    p1.textContent = item.activity;
    p.appendChild(p1);


    // === CREATE ptag ===


}












    // === CREATE TR ===
    let tr = document.createElement('tr')
    tr.setAttribute('align', 'center');
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

// === CREATE TH ===
    let td = document.createElement('td');
    tr.appendChild(td)


// === CREATE ATAG ===
    let a = document.createElement('a');
    a.className = "mt-3 w-75 btn btn-info"
    a.textContent = "Rediger"
    a.href = "/booking/history/" + item.id;
    td.appendChild(a);
}