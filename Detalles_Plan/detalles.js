function enviarFormulario(e) {
    // Evita que la página se recargue e interrumpa la redirección
    if (e) e.preventDefault();

    // Captura y limpieza de espacios en blanco al inicio y final
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const ciudad = document.getElementById('ciudad').value;
    const consulta = document.getElementById('consulta').value;
    const producto = document.getElementById('producto').value;
    const origen = document.getElementById('origen').value;
    const sugerencias = document.getElementById('sugerencias').value.trim();

    // 1. VALIDACIÓN DE CAMPOS VACÍOS
    if (nombre === "" || correo === "" || celular === "" || cedula === "") {
        alert("⚠️ Por favor, escribe tus datos de contacto (Nombre, Correo, Celular y Cédula).");
        return false; 
    }

    // 2. LÍMITES Y FORMATO DEL NOMBRE (Solo letras y espacios, largo estándar)
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (nombre.length < 3 || nombre.length > 50) {
        alert("⚠️ El nombre debe tener entre 3 y 50 caracteres.");
        return false;
    }
    if (!regexNombre.test(nombre)) {
        alert("⚠️ El nombre solo puede contener letras y espacios.");
        return false;
    }

    // 3. VALIDACIÓN ESTÁNDAR DE CORREO ELECTRÓNICO (RegEx RFC 5322)
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (correo.length > 100) {
        alert("⚠️ El correo electrónico es demasiado largo (máximo 100 caracteres).");
        return false;
    }
    if (!regexCorreo.test(correo)) {
        alert("⚠️ Por favor, ingrese un correo electrónico válido (ejemplo@dominio.com).");
        return false;
    }

    // 4. LÍMITES Y FORMATO DE CELULAR (Colombia: 10 dígitos, debe iniciar con 3)
    const regexCelular = /^3[0-9]{9}$/;
    if (!regexCelular.test(celular)) {
        alert("⚠️ El celular debe ser un número válido de 10 dígitos y comenzar con 3.");
        return false;
    }

    // 5. LÍMITES Y FORMATO DE CÉDULA (Solo números, longitud real de 7 a 10 dígitos)
    const regexCedula = /^[0-9]{7,10}$/;
    if (!regexCedula.test(cedula)) {
        alert("⚠️ La cédula debe contener únicamente números y tener entre 7 y 10 dígitos.");
        return false;
    }

    // 6. VALIDACIÓN DE MENÚS DESPLEGABLES
    if (ciudad === "" || consulta === "" || producto === "" || origen === "") {
        alert("⚠️ Por favor, selecciona una opción en todos los menús desplegables.");
        return false; 
    }

    // 7. VALIDACIÓN CONDICIONAL DE SUGERENCIAS Y LÍMITE DE TEXTO
    if (consulta === "Sugerencias" && sugerencias === "") {
        alert("📝 Ya que seleccionaste el tipo de consulta 'Sugerencias', por favor escríbenos tu comentario en la caja inferior.");
        return false;
    }
    if (sugerencias.length > 500) {
        alert("⚠️ El mensaje adicional no puede superar los 500 caracteres.");
        return false;
    }

    // PROCESAMIENTO DE DATOS SEGUROS
    const informeFormulario = {
        usuario: nombre,
        email: correo,
        telefono: celular,
        documento: cedula,
        ubicacion: ciudad,
        motivoConsulta: consulta,
        productoInteres: producto,
        medioDescubrimiento: origen,
        mensajeAdicional: sugerencias || "Ninguno"
    };
    
    console.log("¡Formulario de Detalle Procesado!", informeFormulario);
    
    alert(`¡Perfecto, ${nombre}!\nHemos registrado tu solicitud sobre nuestro "${producto}". Nos comunicaremos contigo a la ciudad de ${ciudad}.`);

    document.querySelector('form').reset();
    window.location.href = "loading.html";
}

// Inicializador del evento
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', enviarFormulario);
    }
});