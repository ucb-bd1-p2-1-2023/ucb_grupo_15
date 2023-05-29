    // Función para enviar los datos a la base de datos
    function enviarDatos() {
        // Aquí puedes incluir tu lógica para enviar los datos a través de una solicitud fetch,
        // utilizando el valor de "seleccionados" y "comentario" según tus necesidades.
        // Por ejemplo:
        function obtenerPuntuacionSeleccionada() {
            const radios = document.querySelectorAll('input[type="radio"]');
            let puntuacion = 0;
        
            radios.forEach(function (radio) {
            if (radio.checked) {
                puntuacion = parseInt(radio.value);
            }
            });
        
            return puntuacion;
        }
        
        function obtenerComentario() {
            const comentario = document.querySelector('.coment_text').value;
            return comentario;
        }

        function getValuesCalificacion() {
            const puntuacion = obtenerPuntuacionSeleccionada();
            const comentario = obtenerComentario();

            return {
            puntuacion: puntuacion,
            comentario: comentario,
            }
        }

        const url = 'http://localhost:3000/Calificaciones';
        const method = 'POST';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = JSON.stringify(getValuesCalificacion());
        const medatata = { method, headers, body };
        fetch(url, medatata)
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
        window.location.href = '../html/paginaPrincipal.html';
    }