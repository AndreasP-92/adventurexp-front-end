
const thisForm = document.getElementById('activityForm');

//======== FETCH Activity ========

thePath = window.location.pathname;
const name = thePath.substring(thePath.lastIndexOf('/')+1)

const actUrl = `http://localhost:5002/select/activity/${name}`;

const requestOptions = {
    'content-type': 'application/json',
    method: 'GET',
    redirect: 'follow'
};

fetch(actUrl, requestOptions)
    .then(response => response.json())
    .then(data => {
        gotoneActData(data)
        console.log(data)
    })


//======== PRINT EVENT INFO ========
function gotoneActData(data){
    document.getElementById('activity_name').value = data.name;
    document.getElementById('activity_subheading').value = data.subheading;
    document.getElementById('activity_avail_start').value = data.duration;
    document.getElementById('activity_avail_end').value = data.duration;
    document.getElementById('duration').value = data.duration;
    document.getElementById('activity_min_age').value = data.age;
    document.getElementById('activity_group_size').value =data.size;
    document.getElementById('activity_price').value = data.price;
    document.getElementById('activity_desc').value = data.description;
    document.getElementById('activity_practical_info').value = data.practicalinfo;
    console.log('data======',data.name)
}

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

thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();


        fetch(`http://localhost:5002/edit/activity`, {
            method: 'POST',
            body: JSON.stringify({
                'activity_name': activity_name.value,
                'activity_pic': activity_pic.value,
                'activity_avail_start': activity_avail_start.value,
                'activity_avail_end': activity_avail_end.value,
                'activity_min_age': activity_min_age.value,
                'activity_group_size': activity_group_size.value,
                'activity_price': activity_price.value,
                'activity_desc': activity_desc.value,
                'activity_subheading': activity_subheading.value,
                'activity_practical_info': activity_practical_info.value



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
    });

