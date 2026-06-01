let nombre = "";
let correo = "";
let celular = "";
let cedula = "";
let ciudad = "";
let consulta = "";
let producto = "";
let origen = "";
let observaciones = "";

function enviarFormulario() {
    nombre = document.getElementById("nombre").value.trim();
    correo = document.getElementById("correo").value.trim();
    celular = document.getElementById("celular").value.trim();
    cedula = document.getElementById("cedula").value.trim();
    ciudad = document.getElementById("ciudad").value;
    consulta = document.getElementById("consulta").value;
    producto = document.getElementById("producto").value;
    origen = document.getElementById("origen").value;
    observaciones = document.getElementById("sugerencias").value.trim();

    if (nombre === "") {
        alert("Por favor, ingrese su nombre completo.");
        return;
    }
    if (nombre.length < 3) {
        alert("El nombre debe tener al menos 3 caracteres.");
        return;
    }
    if (nombre.length > 50) {
        alert("El nombre no puede superar los 50 caracteres.");
        return;
    }

    if (correo === "") {
        alert("Por favor, ingrese su correo electrónico.");
        return;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    if (celular === "") {
        alert("Por favor, ingrese su número de celular.");
        return;
    }
    if (celular.length !== 10 || isNaN(celular)) {
        alert("El número de celular debe tener exactamente 10 dígitos numéricos.");
        return;
    }

    if (cedula === "") {
        alert("Por favor, ingrese su número de cédula.");
        return;
    }
    if (cedula.length < 7 || cedula.length > 10 || isNaN(cedula)) {
        alert("La cédula debe ser numérica y tener entre 7 y 10 dígitos.");
        return;
    }

    if (ciudad === "") {
        alert("Por favor, elija una ciudad de la lista.");
        return;
    }

    if (consulta === "") {
        alert("Por favor, seleccione el tipo de consulta.");
        return;
    }

    if (producto === "") {
        alert("Por favor, seleccione un producto.");
        return;
    }

    if (origen === "") {
        alert("Por favor, indíquenos cómo se enteró del producto.");
        return;
    }

    if (observaciones === "") {
        alert("Por favor, escriba sus sugerencias u observaciones.");
        return;
    }
    window.location.href = "loading.html";
}