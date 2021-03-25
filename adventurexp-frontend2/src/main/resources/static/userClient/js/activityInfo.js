//======== GET ONE ACTIVITY ========
thePath = window.location.pathname;
const name = thePath.substring(thePath.lastIndexOf('/')+1)

const activityUrl = `http://localhost:5002/select/activity/${name}`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

//======== FETCH ACTIVITY ========
fetch(activityUrl, requestOptions)
    .then(response => response.json())
    .then(data  => {
        fillActivityHeader(data)
        fillBreadParent(data)
        fillPrice(data)
        fillPInfo(data)
        console.log(data)
    })

//======== FETCH DURATIONS ========

const durationUrl = `http://localhost:5002/select/all/durations/${name}`;

fetch(durationUrl, requestOptions)
    .then(response => response.json())
    .then(data  => {
        console.log(data)
        // fillDuration(data[0])
        data.forEach(fillDuration)
    })

//======== FILL ACTIVITY HEADER FUNCTION ========
function fillActivityHeader(item) {
    console.log(item)
    const headerParent = document.querySelector('.activityHeader')

    // === CREATE h3 ===
    let h3 = document.createElement('h3')
    h3.textContent = item.name;
    headerParent.appendChild(h3)

    // === CREATE h4 ===
    let h4 = document.createElement('h4')
    h4.textContent = item.subheading;
    h4.style.paddingBottom = "5%"
    headerParent.appendChild(h4)

}
//======== FILL BREAD PARENT FUNCTION ========

function fillBreadParent(item){
    const breadParent = document.querySelector('.breadText')

    // === CREATE ptag ===
    let p = document.createElement('p')
    p.className = "text-white"
    p.textContent = item.description;
    breadParent.appendChild(p)

}
//======== FILL DURATION FUNCTION ========

function fillDuration(item){
    const duration1 = document.querySelector('.duration1')


    // === CREATE ptag ===
    let p1 = document.createElement('p')
    p1.textContent = item.duration;
    duration1.appendChild(p1)

    // let p2 = document.createElement('p')
    // p2.textContent = item.duration;
    // duration1.appendChild(p2)
    //
    // let p3 = document.createElement('p')
    // p3.textContent = item.duration;
    // duration1.appendChild(p3)
}

//======== FILL PRICE FUNCTION ========
function fillPrice(item){
    const price = document.querySelector('.price')

    let p1 = document.createElement('p')
    p1.textContent =item.price;
    price.appendChild(p1)

}

//======== FILL PINFO FUNCTION ========
function fillPInfo(item){
    const pinfo = document.querySelector('.pinfo')

    let p = document.createElement('p')
    p.textContent = item.practicalinfo;
    pinfo.appendChild(p)
}
