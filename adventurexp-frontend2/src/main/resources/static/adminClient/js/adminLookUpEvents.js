//======== GET ALL ACTIVITIES ========

//======== INITIALIZE FUNCTIONS ========

getActivities();

function getActivities(){
    const myUrl = `http://localhost:5002/select/activities`;

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
        th1.textContent = item.name;
        tr.appendChild(th1);

// === CREATE TH ===
        let th2 = document.createElement('th');
        th2.textContent = item.starts;
        tr.appendChild(th2);

// === CREATE TH ===
        let th3 = document.createElement('th');
        th3.textContent = item.ends;
        tr.appendChild(th3);

        // === CREATE TH ===
        let th4 = document.createElement('th');
        th4.textContent = item.age;
        tr.appendChild(th4);

        // === CREATE TH ===
        let th5 = document.createElement('th');
        th5.textContent = item.size;
        tr.appendChild(th5);

        // === CREATE TH ===
        let th6 = document.createElement('th');
        th6.textContent = item.practicalinfo;
        tr.appendChild(th6);

        // === CREATE TH ===
        let th7 = document.createElement('th');
        th7.textContent = item.pic;
        tr.appendChild(th7);

        // === CREATE TD ===
        let td = document.createElement('td');
        td.setAttribute('align', 'center');
        tbody.appendChild(td);


        // === CREATE ATAG ===
        let button = document.createElement('button');
        button.className = "mt-3 w-75  btn btn-info"
        button.textContent = "Rediger Event"
        button.href = "/admin/index"+item.id;
        tr.appendChild(button);

}
