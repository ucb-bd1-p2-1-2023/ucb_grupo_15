//Coneccion con la base de datos
function submitFormDriver() {

    const carnet = localStorage.getItem('carnet');
    alert(carnet);

    function getValuesDriver() {
        return {
            carnet : localStorage.getItem('carnet'),
            placa : document.getElementById('placa').value,
        }
    }

    function getValuesVehiculo() {
        return {
            modelo : document.getElementById('marca_auto').value,
            placa : document.getElementById('placa').value,
            capacidad :document.getElementById('capacidad').value,
        }
    }

    function conectarseDriver() {
        const url = 'http://localhost:3000/Driver';
        const method = 'POST';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(getValuesDriver());
        const medatata = { method, headers, body };
        fetch(url, medatata)
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    function conectarseVehiculo() {
        const url = 'http://localhost:3000/Vehiculo';
        const method = 'POST';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(getValuesVehiculo());
        const medatata = { method, headers, body };
        fetch(url, medatata)
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    }

    conectarseVehiculo();
    conectarseDriver();
}