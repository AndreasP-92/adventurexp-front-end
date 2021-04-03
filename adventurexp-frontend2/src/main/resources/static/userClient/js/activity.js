const thisForm = document.getElementById('activityForm');
const activity_name = document.getElementById('activity_name');
const activity_pic = document.getElementById('activity_pic');
const activity_avail_start = document.getElementById('activity_avail_start');
const activity_avail_end = document.getElementById('activity_avail_end');
const activity_min_age = document.getElementById('activity_min_age');
const activity_group_size = document.getElementById('activity_group_size');
const activity_desc = document.getElementById('activity_desc');
const activity_price = document.getElementById('activity_price');
const activity_subheading = document.getElementById('activity_subheading');
const activity_practical_info = document.getElementById('activity_practical_info');

// ============== GET ACTIVITY ==============

//     === EVENT LISTENER ===

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const myUrl = `http://localhost:5002/select/activity/${activity_name.value}`;

    const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
    };

    fetch(myUrl, requestOptions)
    .then(response => response.json())

    .then(data => {
        console.log(data)
            console.log("findes allerede")
            document.getElementById('alreadyExists').innerHTML = "Event Eksistere allerede";

    }).catch(async function(){
        console.log("Findes ikke")
        let optionValues = $('#duration').val();
        await insertActivity(optionValues);
    })
});

// ============== INSERT DURATION ==============

async function insertDuration(duration_time, ac_name){

    console.log('INSERT DURATION =====',duration_time);

            fetch('http://localhost:5002/insert/duration', {
                method: 'POST',
                body: JSON.stringify({
                    'duration'   : duration_time,
                    'activityName'   : ac_name
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
                console.log(data)
            }).catch(function (error) {
                console.warn('Something went wrong.', error);

            });
}

// ============== INSERT ACTIVITY ==============

async function insertActivity(optionValues){
    const filename = activity_pic.files[0].name;

    let newStartDate = new Date(activity_avail_start.value);
    let newEndDate = new Date(activity_avail_end.value);
    //
    let newStartDateYear = newStartDate.getMonth()+1;
    let newEndDateYear = newEndDate.getMonth()+1;
    //
    let newStartDateMonth = newStartDate.getDate();
    let newEndDateMonth = newEndDate.getDate();

    let startDate = newStartDate.getUTCFullYear() + ", " + newStartDateYear + ", " + newStartDateMonth;
    let endDate = newEndDate.getUTCFullYear() + ", " + newEndDateYear + ", " + newEndDateMonth;

    console.log(startDate)
    console.log(endDate)
    // alert("test")


    fetch('http://localhost:5002/insert/activity', {
        method: 'POST',
        body: JSON.stringify({
            'name'          : activity_name.value,
            'starts'        : startDate,
            'ends'          : endDate,
            'age'           : activity_min_age.value,
            'size'          : activity_group_size.value,
            'description'   : activity_desc.value,
            'pic'           : '/images/events/'+filename,
            'price'         : activity_price.value,
            'subheading'    : activity_subheading.value,
            'practicalinfo' : activity_practical_info.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
            console.log(response)
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log("AFTER INSERT=========",data.name)
        console.log(data)
        for(let i = 0; optionValues.length > i; i++){
            console.log("OPTIONS====",optionValues[i])
            insertDuration(optionValues[i], data.name)
        }
        window.location.href = "/"
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}

