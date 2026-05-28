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