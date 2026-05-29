document.addEventListener("DOMContentLoaded", () => {
    
    const tarjetas = document.querySelectorAll(".seccion-recorrido .tarjeta-paso");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            
            const tarjetaActiva = document.querySelector(".seccion-recorrido .tarjeta-paso.activa");
            
            if (tarjetaActiva) {
                tarjetaActiva.classList.remove("activa");
            }
            
            tarjeta.classList.add("activa");
        });
    });
});



// --- LOGICA DE REDIRECCIÓN AUTOMÁTICA (PÁGINA DE CARGA) ---
// Comprobamos si nos encontramos actualmente en la página "procesando.html"
if (window.location.pathname.includes("procesando.html")) {
    
    // Ejecutamos una cuenta regresiva de 5 segundos (5000ms) usando JavaScript vanilla
    setTimeout(() => {
        
        console.log("Tiempo de carga cumplido. Redireccionando...");
        
        // OPCIÓN A: Redireccionar de vuelta al Home principal
        window.location.href = "index.html";
        
        // OPCIÓN B: Si creas una página de éxito en el futuro, cambias "index.html" por esa ruta.
        
    }, 5000); // 5000 milisegundos exactos sincronizados con la barra de carga CSS
}