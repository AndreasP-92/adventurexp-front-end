
const SearchMail        = document.getElementById('searchMail');
const chooseActivity    = document.getElementById('chooseActivity');
const notFound          = document.getElementById('notFound');

//======== INITIALIZE FUNCTIONS ========

getActivities();

//======== RESET SEARCH ========

function reset(){
    window.location.href = "/admin/bookings/closed"
}

//======== GET ALL ACTIVITIES ========

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
            data.forEach(fillActivityDropdown)
        })
}

//======== GET ALL BOOKING HISTORIES ========

function searchFunction(){
    console.log(SearchMail.value)
    console.log(chooseActivity.value)

    if(SearchMail.value != ""){
        fetch(`http://localhost:5002/select/closed/booking/${searchMail.value}`)
        // fetch(`http://localhost:5002/select/closed/booking/and@and`)
            .then(resp => resp.json())
            .then(data =>{
                console.log(data)
                data.forEach(fillTbody)
                notFound.innerText = "";
                if(data.length == 0){
                    console.log("ikke fundet")
                    notFound.innerText = "Ingen Bookings Fundet"
                }

            }).catch(function(e){
            console.log(e)
            notFound.innerText = "Ingen Bookings Fundet"
            console.log("Ingen mail modtaget")
        })
        }else if(chooseActivity != 0){

            console.log("ingen aktiviteter")

            fetch(`http://localhost:5002/select/closed/booking/activity/${chooseActivity.value}`)
            // fetch(`http://localhost:5002/select/closed/booking/activity/black death`)
                .then(resp => resp.json())
                .then(data =>{
                    console.log(data)
                    data.forEach(fillTbody)
                    notFound.innerText = "";
                    if(data.length == 0){
                        console.log("ikke fundet")
                        notFound.innerText = "Ingen Bookings fundet"
                    }

                }).catch(function() {
                notFound.innerText = "Fejl, prøv igen senere..."
                console.log("Ingen aktivitet modtaget")
            })

        } else if(chooseActivity.value == 0 && searchMail.value != ""){
            console.log("ingen aktiviteter")

        fetch(`http://localhost:5002/select/closed/booking/${chooseActivity}/${SearchMail.value}`)
            // fetch(`http://localhost:5002/select/closed/booking/black death/and@and`)
            .then(resp => resp.json())
            .then(data =>{
                console.log(data)
                data.forEach(fillTbody)
                notFound.innerText = "";
                if(data.length == 0){
                    console.log("ikke fundet")
                    notFound.innerText = "Fejl, prøv igen senere..."
                }

            }).catch(function() {
            notFound.innerText = "Venligst søg efter en Profil og Rolle"
            console.log("Ingen aktivitet modtaget")
        })
    }else{
        fetch(`http://localhost:5002/select/bookings`)
            // fetch(`/search/bookings/and@and/black death`)
            .then(resp => resp.json())
            .then(data =>{
                console.log(data)
                data.forEach(fillTbody)
                notFound.innerText = "";
                if(data.length == 0){
                    console.log("ikke fundet")
                    notFound.innerText = "Ingen Bookings Fundet"
                }

            }).catch(function(){
            notFound.innerText = "Fejl, prøv igen senere..."
            console.log("Ingen mail modtaget")
        })
    }

}

function deleteBooking(id){
    if(confirm("Er du sikker?")){
        console.log(id)
        const requestOptions = {
            'content-type': 'application/json',
            method: 'POST',
            redirect: 'follow'
        };
        const url = `http://localhost:5002/delete/booking/${id}`
        console.log(id)
        fetch(url,requestOptions)
            .then(resp => resp.json())
            .then(console.log)
            .catch(function(e){
                console.log(e)
            })
        window.location.href = "/admin/bookings/closed"
    }
}

// === FILL BOOKING LIST CLOSED TBODY ===
function fillTbody(item, index) {
    if(item.bookingClosed == 1){
        const tbody = document.querySelector('.tbody')
        console.log(item.activity);

    // === CREATE TR ===
        let tr = document.createElement('tr');
        tr.setAttribute('align', 'center');
        tbody.appendChild(tr);

    // === CREATE TH ===
        let th1 = document.createElement('th');
        th1.textContent = item.firstname;
        tr.appendChild(th1);

// === CREATE TH ===
        let th3 = document.createElement('th');
        th3.textContent = item.lastname;
        tr.appendChild(th3);

// === CREATE TH ===
        let th4 = document.createElement('th');
        th4.textContent = item.mail;
        tr.appendChild(th4);

    // === CREATE TH ===
        let th2 = document.createElement('th');
        th2.textContent = item.activity;
        tr.appendChild(th2);

    // === CREATE TD ===
        let td = document.createElement('td');
        td.textContent = item.datetime;
        tr.appendChild(td);

    // === CREATE TD ===
        let td2 = document.createElement('td');
        td2.textContent = item.guests;
        tr.appendChild(td2);

        // === CREATE ATAG ===
        let button = document.createElement('button');
        button.className = "mt-3 w-75  btn btn-danger"
        button.addEventListener('click',function(e){
            deleteBooking(item.bookingId)
        })
        button.textContent = "Slet"
        button.href = "/booking/history/"+item.id;
        tr.appendChild(button);
    }
}

function fillActivityDropdown(item, index){

    let el = document.createElement("option");
    el.textContent = item.name;
    console.log(index)
    console.log("ITEM=====",item.name)
    el.value = item.name;
    chooseActivity.appendChild(el);
}

