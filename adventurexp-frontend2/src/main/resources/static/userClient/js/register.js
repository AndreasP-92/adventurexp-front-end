const thisForm = document.getElementById('registerForm');
// alert("test")
thisForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(thisForm).entries()
    const formData2 = new FormData(thisForm).entries()

    await insertProfile(formData)
    await  insertUser(formData2)


});
async function insertUser(formData){
    const response1 = await fetch('http://138.197.186:5002/insert/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
    });

    const result1 = await response1.json();
    console.log(result1)
}

async function insertProfile(formData){
    const response = await fetch('http://138.197.186:5002/insert/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    const result = await response.json();
    console.log(result)

}
