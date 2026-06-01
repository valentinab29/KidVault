function enviarFormulario(event) {
    if (event) event.preventDefault();

 
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const celular = document.getElementById('celular').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const ciudad = document.getElementById('ciudad').value;
    const consulta = document.getElementById('consulta').value;
    const producto = document.getElementById('producto').value;
    const origen = document.getElementById('origen').value;
    const sugerencias = document.getElementById('sugerencias').value.trim();

    if (nombre === "" || correo === "" || celular === "" || cedula === "") {
        alert("⚠️ Por favor, escribe tus datos de contacto (Nombre, Correo, Celular y Cédula).");
        return false; 
    }

    if (nombre.length < 3) {
        alert("⚠️ El nombre debe tener al menos 3 caracteres.");
        return false;
    }
    if (nombre.length > 50) {
        alert("⚠️ El nombre no puede superar los 50 caracteres.");
        return false;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
        alert("⚠️ Por favor, ingrese un correo electrónico válido.");
        return false;
    }

    if (celular.length !== 10 || isNaN(celular)) {
        alert("⚠️ El número de celular debe tener exactamente 10 dígitos numéricos.");
        return false;
    }

    if (cedula.length < 7 || cedula.length > 10 || isNaN(cedula)) {
        alert("⚠️ La cédula debe ser numérica y tener entre 7 y 10 dígitos.");
        return false;
    }

    if (ciudad === "" || consulta === "" || producto === "" || origen === "") {
        alert("⚠️ Por favor, selecciona una opción en todos los menús desplegables.");
        return false; 
    }

    if (consulta === "Sugerencias" && sugerencias === "") {
        alert("📝 Ya que seleccionaste el tipo de consulta 'Sugerencias', por favor escríbenos tu comentario en la caja inferior.");
        return false;
    }

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

    window.location.href = "loading.html";
}