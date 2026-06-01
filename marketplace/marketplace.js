document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('marketplaceForm');
    const checkboxes = document.querySelectorAll('.seguro-checkbox');
    const inputTitular = document.getElementById('titular');
    const displayTitular = document.getElementById('card-name-display');
    const inputTarjeta = document.getElementById('n-tarjeta');
    const displayTarjetaDigits = document.getElementById('card-last-digits');
    const radioMetodos = document.querySelectorAll('input[name="metodo_pago"]');
    const displayCardBrand = document.getElementById('card-brand-display');
    const inputFile = document.getElementById('documento');
    const filePreview = document.getElementById('file-name-preview');
    
    const contenedorBanco = document.getElementById('contenedor-banco');
    const selectBanco = document.getElementById('banco');
    const camposTarjetaFisica = document.getElementById('campos-tarjeta-fisica');
    
    // Elementos nuevos para Billeteras
    const camposBilleteras = document.getElementById('campos-billeteras');
    const selectBilletera = document.getElementById('tipo-billetera');
    const inputCelular = document.getElementById('celular-billetera');
    
    const ticketProductos = document.getElementById('ticket-productos-lista');
    const ticketBadgeTotal = document.getElementById('ticket-badge-total');
    const ticketMontoTotal = document.getElementById('ticket-monto-total');

    const MAX_TOTAL_PRODUCTOS = 6;
    const MAX_PRODUCTOS_MISMO_TIPO = 5;

    const MIN_LETRAS_TITULAR = 8;
    const LONGITUD_TARJETA_CON_ESPACIOS = 19; 
    const LONGITUD_CVV = 3;

    function formatPesos(numero) {
        return '$' + new Intl.NumberFormat('co-CO').format(numero);
    }

    function calcularTotalCarrito() {
        let cuentaTotalUnidades = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                const id = cb.getAttribute('data-id');
                const qtyInput = document.getElementById(`qty-${id}`);
                cuentaTotalUnidades += parseInt(qtyInput.value, 10);
            }
        });
        return cuentaTotalUnidades;
    }

    function actualizarTicket() {
        let subtotal = 0;
        let cantidadTotalItems = 0;
        let htmlProductos = [];

        checkboxes.forEach(cb => {
            const id = cb.getAttribute('data-id');
            const qtyInput = document.getElementById(`qty-${id}`);
            
            if (cb.checked) {
                const nombre = cb.getAttribute('data-nombre');
                const precio = parseFloat(cb.getAttribute('data-precio'));
                const cantidad = parseInt(qtyInput.value, 10);
                
                subtotal += precio * cantidad;
                cantidadTotalItems += cantidad;
                htmlProductos.push(`${nombre} (x${cantidad})`);
            }
        });

        if (htmlProductos.length === 0) {
            ticketProductos.textContent = "Ninguno seleccionado";
            ticketBadgeTotal.textContent = "0";
            ticketMontoTotal.textContent = "$0";
        } else {
            ticketProductos.innerHTML = htmlProductos.join('<br>');
            ticketBadgeTotal.textContent = cantidadTotalItems;
            ticketMontoTotal.textContent = formatPesos(subtotal);
        }
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const id = cb.getAttribute('data-id');
            const qtyInput = document.getElementById(`qty-${id}`);
            
            if (cb.checked) {
                if (calcularTotalCarrito() > MAX_TOTAL_PRODUCTOS) {
                    cb.checked = false;
                    alert(`No puedes añadir esta unidad. El límite acumulado del carrito es de ${MAX_TOTAL_PRODUCTOS} productos.`);
                    return;
                }
            } else {
                qtyInput.value = 1;
            }
            actualizarTicket();
        });
    });

    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const id = btn.getAttribute('data-id');
            const checkboxAsociado = document.getElementById(`check-${id}`);
            const qtyInput = document.getElementById(`qty-${id}`);
            let valorActual = parseInt(qtyInput.value, 10);

            if (!checkboxAsociado.checked) {
                alert('Primero debes activar el plan marcando la casilla correspondiente.');
                return;
            }

            if (btn.classList.contains('qty-plus')) {
                if (valorActual >= MAX_PRODUCTOS_MISMO_TIPO) {
                    alert(`Límite alcanzado: Máximo ${MAX_PRODUCTOS_MISMO_TIPO} unidades por plan.`);
                    return;
                }
                qtyInput.value = valorActual + 1;
                if (calcularTotalCarrito() > MAX_TOTAL_PRODUCTOS) {
                    qtyInput.value = valorActual;
                    alert(`Límite global superado: El carrito no puede exceder las ${MAX_TOTAL_PRODUCTOS} unidades en total.`);
                    return;
                }
            } else if (btn.classList.contains('qty-minus')) {
                if (valorActual > 1) {
                    qtyInput.value = valorActual - 1;
                }
            }
            actualizarTicket();
        });
    });

    inputTitular.addEventListener('input', (e) => {
        let texto = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        e.target.value = texto;
        displayTitular.textContent = texto.trim() === "" ? "Blanca García" : texto;
    });

    if (inputTarjeta) {
        inputTarjeta.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;

            if (value.length >= 4) {
                displayTarjetaDigits.textContent = value.slice(-4);
            } else if (value.length > 0) {
                displayTarjetaDigits.textContent = value;
            } else {
                displayTarjetaDigits.textContent = "3456";
            }
        });
    }

    const inputCVV = document.getElementById('cvv');
    if (inputCVV) {
        inputCVV.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    if (inputCelular) {
        inputCelular.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value.length >= 4) {
                displayTarjetaDigits.textContent = e.target.value.slice(-4);
            }
        });
    }

    if (selectBilletera) {
        selectBilletera.addEventListener('change', (e) => {
            if (e.target.value !== "") {
                displayCardBrand.textContent = e.target.value.toUpperCase();
            } else {
                displayCardBrand.textContent = "BILLETERA";
            }
        });
    }

    radioMetodos.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const metodo = e.target.value;
            displayCardBrand.textContent = metodo.toUpperCase();
            
            contenedorBanco.style.display = 'none';
            selectBanco.required = false;
            camposBilleteras.style.display = 'none';
            if (selectBilletera) selectBilletera.required = false;
            if (inputCelular) inputCelular.required = false;
            if (camposTarjetaFisica) camposTarjetaFisica.style.display = 'none';
            establecerRequeridosTarjeta(false);
            
            if (metodo === 'pse') {
                contenedorBanco.style.display = 'block';
                selectBanco.required = true;
            } else if (metodo === 'visa' || metodo === 'mastercard') {
                if (camposTarjetaFisica) {
                    camposTarjetaFisica.style.display = 'block';
                }
                establecerRequeridosTarjeta(true);
            } else if (metodo === 'billeteras') {
                camposBilleteras.style.display = 'block';
                if (selectBilletera) selectBilletera.required = true;
                if (inputCelular) inputCelular.required = true;
                displayCardBrand.textContent = selectBilletera && selectBilletera.value ? selectBilletera.value.toUpperCase() : "BILLETERA";
            }
        });
    });

    function establecerRequeridosTarjeta(requerido) {
        const nTarjeta = document.getElementById('n-tarjeta');
        const cvv = document.getElementById('cvv');
        const mm = document.getElementById('exp-mm');
        const aa = document.getElementById('exp-aa');
        if (nTarjeta && cvv && mm && aa) {
            nTarjeta.required = requerido;
            cvv.required = requerido;
            mm.required = requerido;
            aa.required = requerido;
        }
    }

    if (inputFile) {
        inputFile.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                filePreview.textContent = `Archivo cargado: ${e.target.files[0].name}`;
            } else {
                filePreview.textContent = "No se ha seleccionado ningún archivo";
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let carritoActivo = false;
        checkboxes.forEach(cb => { if (cb.checked) carritoActivo = true; });

        if (!carritoActivo) {
            alert('Error: Debes seleccionar al menos un plan de seguro antes de finalizar la compra.');
            return;
        }

        if (inputTitular.value.trim().length < MIN_LETRAS_TITULAR) {
            alert(`Error en Datos de Facturación: El nombre del titular es demasiado corto (Mínimo ${MIN_LETRAS_TITULAR} caracteres).`);
            inputTitular.focus();
            return;
        }

        const metodoSeleccionado = document.querySelector('input[name="metodo_pago"]:checked').value;
        let detalleMetodo = "";

        if (metodoSeleccionado === 'pse') {
            if (selectBanco.value === "") {
                alert('Error: Selecciona una entidad bancaria para continuar con el pago.');
                selectBanco.focus();
                return;
            }
            const nombreBanco = selectBanco.options[selectBanco.selectedIndex].text;
            detalleMetodo = `vía PSE a través de ${nombreBanco}`;

        } else if (metodoSeleccionado === 'billeteras') {
            if (selectBilletera.value === "") {
                alert('Error: Selecciona qué billetera digital vas a utilizar (Nequi o Daviplata).');
                selectBilletera.focus();
                return;
            }
            if (inputCelular.value.length < 10) {
                alert('Error: El número de celular para la billetera digital debe tener exactamente 10 dígitos.');
                inputCelular.focus();
                return;
            }
            const billeteraElegida = selectBilletera.value === 'nequi' ? 'Nequi' : 'Daviplata';
            detalleMetodo = `desde tu cuenta de ${billeteraElegida} (*${inputCelular.value.slice(-4)})`;

        } else if (metodoSeleccionado === 'visa' || metodoSeleccionado === 'mastercard') {
            const nTarjeta = document.getElementById('n-tarjeta');
            const cvv = document.getElementById('cvv');
            const mm = document.getElementById('exp-mm');
            const aa = document.getElementById('exp-aa');

            if (nTarjeta.value.length < LONGITUD_TARJETA_CON_ESPACIOS) {
                alert('Error en Tarjeta: El número de tarjeta está incompleto. Debe tener exactamente 16 dígitos.');
                nTarjeta.focus();
                return;
            }
            if (cvv.value.length < LONGITUD_CVV) {
                alert('Error en Tarjeta: El código de seguridad CVV debe tener exactamente 3 dígitos.');
                cvv.focus();
                return;
            }
            const mes = parseInt(mm.value, 10);
            if (isNaN(mes) || mes < 1 || mes > 12) {
                alert('Error en Tarjeta: El mes de expiración no es válido (Debe ser entre 01 y 12).');
                mm.focus();
                return;
            }
            if (aa.value.length < 2) {
                alert('Error en Tarjeta: El año de expiración debe tener 2 dígitos.');
                aa.focus();
                return;
            }
            detalleMetodo = `con tu tarjeta ${metodoSeleccionado.toUpperCase()} terminada en *${nTarjeta.value.slice(-4)}`;
        }

        if (!inputFile.files || inputFile.files.length === 0) {
            alert('Error: Es obligatorio adjuntar la documentación requerida para procesar el seguro.');
            return;
        }

        const montoFinal = ticketMontoTotal.textContent;
        
        alert(`¡Pago Realizado con Éxito! 🎉\n\n` +
              `Tu transacción por valor de ${montoFinal} ha sido aprobada ${detalleMetodo}.\n` +
              `Hemos recibido correctamente el documento adjunto: "${inputFile.files[0].name}".\n\n` +
              `¡Gracias por asegurar el futuro educativo con KidVault y Global Seguros!`);
    });
});