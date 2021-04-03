const thisForm          = document.getElementById('shiftForm');
const mail              = document.getElementById('mail');
const activity          = document.getElementById('activity');
const activityStart     = document.getElementById('activityStart');
const activityEnd       = document.getElementById('activityEnd');
// alert("test222")

getUsers();
getActivities();

thisForm.addEventListener('submit', async function(e){
    e.preventDefault();

    let newStartDate = new Date(activityStart.value);
    let newEndDate = new Date(activityEnd.value);
    //
    let newStartDateYear = newStartDate.getMonth()+1;
    let newEndDateYear = newEndDate.getMonth()+1;
    //
    let newStartDateMonth = newStartDate.getDate();
    let newEndDateMonth = newEndDate.getDate();

    let startDate = newStartDate.getUTCFullYear() + ", " + newStartDateYear + ", " + newStartDateMonth;
    let endDate = newEndDate.getUTCFullYear() + ", " + newEndDateYear + ", " + newEndDateMonth;

    // let newStartDate2 = newStartDate.getFullYear() + " " + newStartDateYear + " " + newStartDateMonth;
    // let newEndDate2 = newEndDate.getFullYear() + " " + newEndDateYear + " " + newEndDateMonth;

    console.log(startDate)
    console.log(endDate)
    // alert("test")


    fetch('http://localhost:5002/insert/shift', {
        method: 'POST',
        body: JSON.stringify({
            'mail'      : mail.value,
            'activity'  : activity.value,
            'starts'    : startDate,
            'ends'      : endDate,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        window.location.href = "/admin/schedule"
        console.log(data)
    }).catch(function (error) {
        console.warn('Something went wrong.', error);


    });
})

function getUsers(){
    const myUrl = `http://localhost:5002/select/users`;

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(myUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(fillUserDropdown)
            console.log(data)
        })
}

function fillUserDropdown(item, index){
    let el = document.createElement("option");
    el.textContent = item.mail;
    console.log(index)
    console.log("ITEM=====",item)
    el.value = item.mail;
    mail.appendChild(el);

}

function getActivities(){
    const myUrl2 = `http://localhost:5002/select/activities`;

    const requestOptions = {
        'content-type': 'application/json',
        method: 'GET',
        redirect: 'follow'
    };

    fetch(myUrl2, requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(fillActivityDropdown)
            console.log(data)
        })
}

function fillActivityDropdown(item, index){
    let el = document.createElement("option");
    el.textContent = item.name;
    console.log(index)
    console.log("ITEM=====",item.name)
    el.value = item.name;
    activity.appendChild(el);

}


