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

    google.maps.event.addListener(marcadorOrigen, 'dragend', function(event) {
        establecerMarcadorOrigen(event.latLng);
        calcularDistancia();
    });

    google.maps.event.addListener(marcadorDestino, 'dragend', function(event) {
        establecerMarcadorDestino(event.latLng);
        calcularDistancia();
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
}

function establecerMarcadorDestino(location) {
    marcadorDestino.setPosition(location);
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

    // Verificar si el valor de 'monto' es un número válido
    if (isNaN(monto)) {
        return ''; // Si el valor no es válido, devuelve una cadena vacía
    }

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

            // Calcula el monto
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

// Conectar con la base de datos
function enviarDatosViaje(datos) {
    const url = 'http://localhost:3000/Viajes';
    const method = 'POST';
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify(datos);
    const metadata = { method, headers, body };

    fetch(url, metadata)
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
        .catch(error => console.error(error));
}

function extraerDatosViaje() {
    var origen = marcadorOrigen.getPosition();
    var destino = marcadorDestino.getPosition();
    var distancia = document.getElementById('resultado_distancia').textContent;
    var duracion = document.getElementById('resultado_duracion').textContent;
    var fechaActual = new Date();
    var fecha = fechaActual.toISOString().slice(0, 10); // Formatear la fecha en 'YYYY-MM-DD'
    var hora = fechaActual.toLocaleTimeString();
    establecesLugar(); // Actualiza los valores antes de obtener el monto
    var monto = document.getElementById('monto').textContent.trim(); // Obtén el monto actualizado y elimina espacios en blanco

    // Verificar si el monto es un número válido
    if (isNaN(parseFloat(monto))) {
        alert('El monto ingresado no es válido.');
        return null;
    }

    var origenLatLong = origen.lat() + ',' + origen.lng(); // Combina las coordenadas de origen en una cadena
    var destinoLatLong = destino.lat() + ',' + destino.lng(); // Combina las coordenadas de destino en una cadena

    return {
        origen: origenLatLong,
        destino: destinoLatLong,
        distanciaViaje: distancia,
        duracionViaje: duracion,
        fechaViaje: fecha,
        horaViaje: hora,
        montoViaje: monto
    };
}



function obtenerValoresYEnviar() {
    var datosViaje = extraerDatosViaje();
    if (datosViaje) {
        enviarDatosViaje(datosViaje);
    }
}
