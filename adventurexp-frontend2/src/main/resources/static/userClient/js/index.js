
//======== GET ALL ACTIVITIES ========

const mail = "javascript version af at hente en parameter"

const myUrl = `http://localhost:5002/select/activities`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};


fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        data.forEach(fillActivities)
        console.log(data)
    })

function fillActivities(item, index){
    const activitySelector = document.querySelector('.activityList')

// === CREATE DIV ===
    let div = document.createElement("div")
    div.className = "col-sm-4"
    activitySelector.appendChild(div);

// === CREATE ATAG ===
    let aTag = document.createElement('a')
    aTag.href = item.id;
    div.appendChild(aTag);

// === CREATE IMAGE TAG ===
    let img = document.createElement("img")
    img.src = item.pic;
    aTag.appendChild(img);

// === CREATE H2 TAG ===
    let h2 = document.createElement("h2")
    h2.textContent = item.name;
    div.appendChild(h2);
}