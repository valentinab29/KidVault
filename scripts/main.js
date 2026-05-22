document.addEventListener("DOMContentLoaded", () => {
    
    const tarjetas = document.querySelectorAll(".recorrido .step-card");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            
            const tarjetaActiva = document.querySelector(".recorrido .step-card.active");
            
            
            if (tarjetaActiva) {
                tarjetaActiva.classList.remove("active");
            }
            
            tarjeta.classList.add("active");
        });
    });
});