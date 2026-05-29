// Variables globales básicas para los datos del formulario
let nombre = "";
let correo = "";
let celular = "";
let cedula = "";
let ciudad = "";
let producto = "";
let observaciones = "";

function enviarFormulario() {
    // 1. Capturar los valores directamente de la interfaz
    nombre = document.getElementById("nombre").value;
    correo = document.getElementById("correo").value;
    celular = document.getElementById("celular").value;
    cedula = document.getElementById("cedula").value;
    ciudad = document.getElementById("ciudad").value;
    producto = document.getElementById("producto").value;
    observaciones = document.getElementById("sugerencias").value;

    // 2. Validar campos obligatorios (Caso base: Campo Vacío)
    if (nombre == "") {
        alert("Por favor, ingrese su nombre completo.");
        return;
    }
    
    if (correo == "") {
        alert("Por favor, ingrese su correo electrónico.");
        return;
    }

    if (celular == "") {
        alert("Por favor, ingrese su número de celular.");
        return;
    }

    if (ciudad == "") {
        alert("Por favor, elija una ciudad de la lista.");
        return;
    }

    if (producto == "") {
        alert("Por favor, seleccione un producto.");
        return;
    }

    // 3. Respuesta exitosa si todo está lleno
    alert("¡Registro Exitoso!\n\nMuchas gracias " + nombre + ", tu solicitud de asesoría para el beneficio de '" + producto + "' ha sido enviada.");
}