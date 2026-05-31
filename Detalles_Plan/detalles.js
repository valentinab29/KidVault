function enviarFormulario() {
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
        return; 
    }

    
    if (ciudad === "" || consulta === "" || producto === "" || origen === "") {
        alert("⚠️ Por favor, selecciona una opción en todos los menús desplegables.");
        return; 
    }

   
    if (consulta === "Sugerencias" && sugerencias === "") {
        alert("📝 Ya que seleccionaste el tipo de consulta 'Sugerencias', por favor escríbenos tu comentario en la caja inferior.");
        return;
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

    document.querySelector('form').reset();
}