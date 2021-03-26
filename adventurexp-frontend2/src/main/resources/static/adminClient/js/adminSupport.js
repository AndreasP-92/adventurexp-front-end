//======== GET ALL ACTIVITIES ========

//======== INITIALIZE FUNCTIONS ========

getActivities();

function getActivities(){
    const myUrl = `http://localhost:5002/select/ticket/system`;

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(myUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(fillTbody)

        })
}

// === FILL BOOKING LIST CLOSED TBODY ===
function fillTbody(item, index) {
    const tbody = document.querySelector('.tbody')
    console.log(item.activity);

    // === CREATE TR ===
    let tr = document.createElement('tr');
    tr.setAttribute('align', 'center');
    tbody.appendChild(tr);

    // === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.mail;
    tr.appendChild(th1);

// === CREATE TH ===
    let td1 = document.createElement('td');
    td1.textContent = item.ticket_id;
    tr.appendChild(td1);

// === CREATE TH ===
    let td2 = document.createElement('td');
    td2.textContent = item.firstname;
    tr.appendChild(td2);

    // === CREATE TH ===
    let td3 = document.createElement('td');
    td3.textContent = item.context;
    tr.appendChild(td3);

    // === CREATE TH ===
    let td5 = document.createElement('td');
    td5.textContent = item.timeStamp;
    tr.appendChild(td5);


    // === CREATE ATAG ===
    let button = document.createElement('button');
    button.className = "mt-3 w-75  btn btn-info"
    button.textContent = "Start Ticket"
    button.href = "/admin/index"+item.id;
    tr.appendChild(button);

}