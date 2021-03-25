const searchButton  = document.getElementById('searchButton');
const searchMail    = document.getElementById('searchMail');
const chooseRole    = document.getElementById('chooseRole');
const notFound      = document.getElementById('notFound');
const deleteButton  = document.getElementById('deleteButton')
// alert("test")

let userArray = []
// fetch(`http://localhost:5002/search/user/${searchMail}`)
// fetch(`http://localhost:5002/search/auth/${chooseRole}`)


function searchFunction() {

    // fetch(`http://localhost:5002/search/user/${searchMail.value}/${chooseRole.value}`)
    fetch(`http://localhost:5002/search/user/and@and/ROLE_ADMIN`)
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

    // console.log("test")


}

function deleteProfile(id){
    if(confirm("Er du sikker?")){

        const requestOptions = {
            'content-type': 'application/json',
            method: 'DELETE',
            redirect: 'follow'
        };
        const url = `http://localhost:5002/delete/profile/${id}`
        console.log(id)
        fetch("http://localhost:5002/delete/profile/1",requestOptions)
            .then(resp => resp.json())
            .then(console.log)
            .catch(function(e){
                console.log(e)
            })
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
    let td = document.createElement('td');
    tr.appendChild(td)

// === CREATE ATAG ===
    let a = document.createElement('button');
    a.className = "mt-3 w-75 btn btn-danger"
    a.addEventListener('click',function(e){
        deleteProfile(item.id)
    })
    // a.setAttribute("onclick", `deleteProfile(${item.mail})`)
    // a.onclick = deleteProfile(item.mail)
    a.textContent = "Luk Profil"
    a.href = "/booking/history/"+item.id;
    td.appendChild(a);
}