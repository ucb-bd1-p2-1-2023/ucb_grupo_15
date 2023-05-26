var map;
var marcadorOrigen;
var marcadorDestino;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -17.372377, lng: -66.143508}, // Centro del mapa inicial
        zoom: 15 // Nivel de zoom inicial
    });

    marcadorOrigen = new google.maps.Marker({
        map: map,
        draggable: true, // Permite arrastrar el marcador
        title: 'Origen'
    });

    marcadorDestino = new google.maps.Marker({
        map: map,
        draggable: true, // Permite arrastrar el marcador
        title: 'Destino'
    });

    google.maps.event.addListener(map, 'click', function(event) {
        establecerMarcadorOrigen(event.latLng);
    });

    google.maps.event.addListener(map, 'center_changed', function() {
        marcadorOrigen.setPosition(map.getCenter());
        calcularDistancia();
    });
}

function establecerMarcadorOrigen(location) {
    marcadorOrigen.setPosition(location);
    //calcularDistancia();
}

function establecerMarcadorDestino(location) {
    marcadorDestino.setPosition(location);
    //calcularDistancia();
}

function establecesLugar(){
    // Obtener los elementos de los labels por su ID
    var fechaLabel = document.getElementById("fechaLabel");
    var horaLabel = document.getElementById("horaLabel");

    // Obtener la fecha y hora actual
    var fechaActual = new Date();

    // Formatear la fecha y hora en el formato deseado
    var fechaFormateada = fechaActual.toLocaleDateString();
    var horaFormateada = fechaActual.toLocaleTimeString();

    // Actualizar el contenido de los labels con la fecha y hora
    fechaLabel.innerHTML += fechaFormateada;
    horaLabel.innerHTML += horaFormateada;
    calcularDistancia();
}
function calcularMonto(distancia, duracion) {
    // Supongamos que el costo por kilómetro es de $2 y el costo por minuto es de $0.5
    var costoPorKilometro = 2;
    var costoPorMinuto = 0.5;

    // Extraer el valor numérico de la distancia y la duración
    var distanciaNum = parseFloat(distancia.replace(' km', ''));
    var duracionNum = parseFloat(duracion.replace(' mins', ''));

    var monto = (distanciaNum * costoPorKilometro) + (duracionNum * costoPorMinuto);

    // Retornar el monto redondeado a 2 decimales
    return monto.toFixed(2);
}

function calcularDistancia() {
    var origen = marcadorOrigen.getPosition();
    var destino = marcadorDestino.getPosition();

    var directionsService = new google.maps.DirectionsService();

    var request = {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            var distancia = response.routes[0].legs[0].distance.text;
            var duracion = response.routes[0].legs[0].duration.text;

            document.getElementById('resultado_distancia').innerHTML = distancia;
            document.getElementById('resultado_duracion').innerHTML = duracion;

            //falta el monto
            var monto = calcularMonto(distancia, duracion);
            document.getElementById('monto').innerHTML = monto + ' Bs.';
        } else {
            document.getElementById('resultado').innerHTML = 'Error al calcular la distancia.';
        }
    });
}

window.onload = function() {
    initMap();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Conectar con la base de datos
function submitViaje() {
    establecesLugar();
    function getValues(){
        var origen = marcadorOrigen.getPosition();
        var destino = marcadorDestino.getPosition();
        var distancia = document.getElementById('resultado_distancia');
        var duracion = document.getElementById('resultado_duracion');
        var fecha = document.getElementById('fechaLabel');
        var hora = document.getElementById('horaLabel');
        var monto = document.getElementById('monto');
        return{
            origenViaje : origen,
            destinoViaje : destino,
            distanciaViaje : distancia.textContent,
            duracionViaje : duracion.textContent,
            fechaViaje : fecha.textContent,
            horaViaje : hora.textContent,
            montoViaje : monto.textContent,
        }
    }
    alert();
    const url = 'http://localhost:3000/Viajes';
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
    getID();
}