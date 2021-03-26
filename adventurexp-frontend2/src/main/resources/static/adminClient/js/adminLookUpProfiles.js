const searchButton  = document.getElementById('searchButton');
const searchMail    = document.getElementById('searchMail');
const chooseRole    = document.getElementById('chooseRole');
const notFound      = document.getElementById('notFound');
const deleteButton  = document.getElementById('deleteButton')

function reset(){
    window.location.href = "/admin/profiles"
}

function searchFunction() {

    if(!searchMail.value){
        fetch(`http://localhost:5002/search/auth/${chooseRole.value}`)
            .then(resp => resp.json())
            .then(data =>{
                console.log(data)
                data.forEach(fillTbody)
                notFound.innerText = "";
                if(data.length == 0){
                    console.log("ikke fundet")
                    notFound.innerText = "Ingen profiler fundet"
                }

            }).catch(function(){
            notFound.innerText = "Venligst søg efter en Profil og Rolle"
            console.log("Ingen mail modtaget")
        })
    }else{
        fetch(`http://localhost:5002/search/user/${searchMail.value}/${chooseRole.value}`)
            .then(resp => resp.json())
            .then(data =>{
                console.log(data)
                data.forEach(fillTbody)
                notFound.innerText = "";
                if(data.length == 0){
                    console.log("ikke fundet")
                    notFound.innerText = "Ingen profiler fundet"
                }

            }).catch(function(){
            notFound.innerText = "Venligst søg efter en Profil og Rolle"
            console.log("Ingen mail modtaget")
        })
    }
}

function deleteProfile(id){
    if(confirm("Er du sikker?")){

        const requestOptions = {
            'content-type': 'application/json',
            method: 'POST',
            redirect: 'follow'
        };
        const url = `http://localhost:5002/delete/profile/${id}`
        console.log(id)
        fetch(url,requestOptions)
            .then(resp => resp.json())
            .then(console.log)
            .catch(function(e){
                console.log(e)
            })
        window.location.href = "/admin/profiles"
    }
}

function fillTbody(item, index) {
    const tbody = document.querySelector('.tbody')
    console.log(item);

// === CREATE TR ===
    let tr = document.createElement('tr')
    tr.setAttribute('align', 'center');
    tbody.appendChild(tr);

// === CREATE TH ===
    let th1 = document.createElement('th');
    th1.textContent = item.mail;
    tr.appendChild(th1);

// === CREATE TH ===
    let th2 = document.createElement('th');
    th2.textContent = item.role;
    tr.appendChild(th2);

// === CREATE TD ===
    let td2 = document.createElement('td');
    tr.appendChild(td2)

// === CREATE ATAG ===
    let a = document.createElement('a');
    a.className = "mt-3 w-75 btn btn-danger"
    a.textContent = "Rediger Profil"
    a.href = "/admin/edit/profile/"+item.id;
    td2.appendChild(a);

// === CREATE TD ===
    let td = document.createElement('td');
    tr.appendChild(td)

// === CREATE BUTTON ===
    let button = document.createElement('button');
    button.className = "mt-3 w-75 btn btn-danger"
    button.addEventListener('click',function(e){
        deleteProfile(item.id)
    })
    a.textContent = "Luk Profil"
    a.href = "/booking/history/"+item.id;
    td.appendChild(a);
    button.textContent = "Luk Profil"
    td.appendChild(button);


}