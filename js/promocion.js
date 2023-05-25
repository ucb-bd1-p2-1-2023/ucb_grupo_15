function submitPromocion() {

    function getValues() {
        return {
            clave : document.getElementById("id_clave").value,
            descuento : document.getElementById("id_descuento").value,
            fecha_ini : document.getElementById("id_date_inicio").value,
            fecha_fin : document.getElementById("id_date_fin").value,
        }
    }

    const url = 'http://localhost:3000/Promociones';
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