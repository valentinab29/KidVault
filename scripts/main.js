document.addEventListener("DOMContentLoaded", function () {
    const botonAnterior = document.querySelector(".boton-flecha.anterior");
    const botonSiguiente = document.querySelector(".boton-flecha.siguiente");
    const grupos = document.querySelectorAll(".grupo-testimonios");
    
    let indiceActivo = 0;

    function cambiarGrupo(nuevoIndice) {
        grupos[indiceActivo].classList.remove("activo");

        indiceActivo = nuevoIndice;

        grupos[indiceActivo].classList.add("activo");
    }

   
    botonSiguiente.addEventListener("click", function () {
        let proximoIndice = indiceActivo + 1;
        if (proximoIndice >= grupos.length) {
            proximoIndice = 0;
        }
        cambiarGrupo(proximoIndice);
    });


    botonAnterior.addEventListener("click", function () {
        let proximoIndice = indiceActivo - 1;
        if (proximoIndice < 0) {
            proximoIndice = grupos.length - 1;
        }
        cambiarGrupo(proximoIndice);
    });
});