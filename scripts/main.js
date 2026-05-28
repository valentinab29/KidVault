document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Buscamos todas las tarjetas usando la nueva clase en español
    const tarjetas = document.querySelectorAll(".seccion-recorrido .tarjeta-paso");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            
            // 2. Buscamos cuál es la tarjeta que tiene la clase activa en este momento
            const tarjetaActiva = document.querySelector(".seccion-recorrido .tarjeta-paso.activa");
            
            // 3. Si encontramos una tarjeta activa, le removemos la clase para apagar el azul
            if (tarjetaActiva) {
                tarjetaActiva.classList.remove("activa");
            }
            
            // 4. Le ponemos la clase activa a la tarjeta que el usuario acaba de presionar
            tarjeta.classList.add("activa");
        });
    });
});