//======== GET ONE ACTIVITY ========


thePath = window.location.pathname;
const name = thePath.substring(thePath.lastIndexOf('/')+1)


const myUrl = `http://localhost:5002/select/activity/${name}`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};


fetch(myUrl, requestOptions)
    .then(response => response.json())
    .then(data  => {
        fillActivityHeader(data)
        fillBreadParent(data)
        fillDuration(data)
        fillPrice(data)
        fillPInfo(data)
        // gotActivityData(data)
        console.log(data)
    })

function gotActivityData(data) {
    console.log('activities====', data)
    data.forEach(fillPInfo)
    // activitiesMap.forEach(fillDropDown)
}

function fillActivityHeader(item) {
    console.log(item)
    const headerParent = document.querySelector('.activityHeader')
    console.log(item.name);

    // === CREATE h3 ===
    let h3 = document.createElement('h3')
    h3.textContent = item.name;
    headerParent.appendChild(h3)

    // === CREATE h4 ===
    let h4 = document.createElement('h4')
    h4.textContent = "Overlev imod rasende zombier"
    h4.style.paddingBottom = "5%"
    headerParent.appendChild(h4)

}

function fillBreadParent(item){
    const breadParent = document.querySelector('.breadText')

    // === CREATE ptag ===
    let p = document.createElement('p')
    p.textContent = item.description;
    breadParent.appendChild(p)

}

function fillDuration(item){
    const duration1 = document.querySelector('.duration1')


    // === CREATE ptag ===
    let p1 = document.createElement('p')
    p1.textContent = item.duration;
    duration1.appendChild(p1)

    let p2 = document.createElement('p')
    p2.textContent = item.duration;
    duration1.appendChild(p2)

    let p3 = document.createElement('p')
    p3.textContent = item.duration;
    duration1.appendChild(p3)
}
function fillPrice(item){
    const price = document.querySelector('.price')

    let p1 = document.createElement('p')
    p1.textContent = "1500 kr"
    price.appendChild(p1)

    let p2 = document.createElement('p')
    p2.textContent = "2500 kr"
    price.appendChild(p2)

    let p3 = document.createElement('p')
    p3.textContent = "3000 kr"
    price.appendChild(p3)
}
function fillPInfo(item){
    const pinfo = document.querySelector('.pinfo')

    let p = document.createElement('p')
    p.textContent = item.practicalInfo;
    pinfo.appendChild(p)
}
