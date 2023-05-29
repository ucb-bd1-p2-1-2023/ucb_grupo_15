function borrarOpcion1(){
    document.getElementById("radio_pasajero").checked = false;
}

function borrarOpcion2(){
    document.getElementById("radio_driver").checked = false;
}


//Coneccion con la base de datos
function submitForm() {
    function getValues() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            carnet : document.getElementById('Carnet').value,
            email: document.getElementById('email').value,
            cellphone: document.getElementById('cel').value,
            direccion: document.getElementById('direccion').value,
        }
    }

    function getValuesPasajero() {
        return {
            carnet : document.getElementById('Carnet').value,
        }
    }

    function conectarUser() {
        const url = 'http://localhost:3000/Users';
        const method = 'POST';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(getValues());
        const medatata = { method, headers, body };
        fetch(url, medatata)
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    function conectarPasajero() {
        const url = 'http://localhost:3000/Pasajeros';
        const method = 'POST';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(getValuesPasajero());
        const medatata = { method, headers, body };
        fetch(url, medatata)
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    conectarUser();

    if (document.getElementById("radio_driver").checked){
        window.location.href = '../html/driver.html';
        localStorage.setItem('carnet', document.getElementById('Carnet').value);
    }
    if (document.getElementById("radio_pasajero").checked){
        conectarPasajero();
        window.location.href = '../html/paginaPrincipal.html';
    }
}