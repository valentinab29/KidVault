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
    
    const ticketProductos = document.getElementById('ticket-productos-lista');
    const ticketBadgeTotal = document.getElementById('ticket-badge-total');
    const ticketMontoTotal = document.getElementById('ticket-monto-total');

    const MAX_TOTAL_PRODUCTOS = 6;
    const MAX_PRODUCTOS_MISMO_TIPO = 5;

    // --- RESTRICCIONES DE RÚBRICA ---
    const MIN_LETRAS_TITULAR = 8;
    const LONGITUD_TARJETA_CON_ESPACIOS = 19; // 16 números + 3 espacios
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

    // CONTROL EN TIEMPO REAL: Solo letras en el nombre del titular
    inputTitular.addEventListener('input', (e) => {
        let texto = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        e.target.value = texto;
        displayTitular.textContent = texto.trim() === "" ? "Blanca García" : texto;
    });

    // CONTROL EN TIEMPO REAL: Formateo de tarjeta cada 4 números
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

    // CONTROL EN TIEMPO REAL: Solo números en el CVV
    const inputCVV = document.getElementById('cvv');
    if (inputCVV) {
        inputCVV.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // CONTROL EN TIEMPO REAL: Solo números en campos de fecha
    const inputMM = document.getElementById('exp-mm');
    const inputAA = document.getElementById('exp-aa');
    [inputMM, inputAA].forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }
    });

    radioMetodos.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const metodo = e.target.value;
            displayCardBrand.textContent = metodo.toUpperCase();
            
            if (metodo === 'pse') {
                contenedorBanco.style.display = 'block';
                selectBanco.required = true;
                camposTarjetaFisica.style.display = 'none';
                establecerRequeridosTarjeta(false);
            } else if (metodo === 'visa' || metodo === 'mastercard') {
                contenedorBanco.style.display = 'none';
                selectBanco.required = false;
                camposTarjetaFisica.style.block = 'block';
                camposTarjetaFisica.style.display = 'block';
                establecerRequeridosTarjeta(true);
            } else if (metodo === 'debito') {
                contenedorBanco.style.display = 'block';
                selectBanco.required = true;
                camposTarjetaFisica.style.display = 'none';
                establecerRequeridosTarjeta(false);
            }
        });
    });

    function establecerRequeridosTarjeta(requerido) {
        if (inputTarjeta && inputCVV && inputMM && inputAA) {
            inputTarjeta.required = requerido;
            inputCVV.required = requerido;
            inputMM.required = requerido;
            inputAA.required = requerido;
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

    // ==========================================================================
    // VALIDACIÓN ESTRICTA DEL FORMULARIO (RÚBRICA DE ENTREGA)
    // ==========================================================================
    form.addEventListener('submit', (e) => {
        let carritoActivo = false;
        checkboxes.forEach(cb => { if (cb.checked) carritoActivo = true; });

        if (!carritoActivo) {
            e.preventDefault();
            alert('Error: Debes seleccionar al menos un plan de seguro antes de finalizar la compra.');
            return;
        }

        // 1. Validar longitud mínima del titular
        if (inputTitular.value.trim().length < MIN_LETRAS_TITULAR) {
            e.preventDefault();
            alert(`Error en Datos de Facturación: El nombre del titular es demasiado corto (Mínimo ${MIN_LETRAS_TITULAR} caracteres).`);
            inputTitular.focus();
            return;
        }

        const metodoSeleccionado = document.querySelector('input[name="metodo_pago"]:checked').value;

        // 2. Validaciones si elige tarjeta de crédito (Visa / Mastercard)
        if (metodoSeleccionado === 'visa' || metodoSeleccionado === 'mastercard') {
            
            if (inputTarjeta.value.length < LONGITUD_TARJETA_CON_ESPACIOS) {
                e.preventDefault();
                alert('Error en Tarjeta: El número de tarjeta está incompleto. Debe tener exactamente 16 dígitos.');
                inputTarjeta.focus();
                return;
            }

            if (inputCVV.value.length < LONGITUD_CVV) {
                e.preventDefault();
                alert('Error en Tarjeta: El código de seguridad CVV debe tener exactamente 3 dígitos.');
                inputCVV.focus();
                return;
            }

            const mes = parseInt(inputMM.value, 10);
            if (isNaN(mes) || mes < 1 || mes > 12) {
                e.preventDefault();
                alert('Error en Tarjeta: El mes de expiración no es válido (Debe ser entre 01 y 12).');
                inputMM.focus();
                return;
            }

            if (inputAA.value.length < 2) {
                e.preventDefault();
                alert('Error en Tarjeta: El año de expiración debe tener 2 dígitos (ej: 27).');
                inputAA.focus();
                return;
            }
        }

        // 3. Validar carga de documentación
        if (!inputFile.files || inputFile.files.length === 0) {
            e.preventDefault();
            alert(`¡Pago Realizado con Éxito! 🎉\n\n` +
              `Tu transacción por valor de ${montoFinal} ha sido aprobada ${detalleMetodo}.\n` +
              `Hemos recibido correctamente el documento adjunto: "${inputFile.files[0].name}".\n\n` +
              `¡Gracias por asegurar el futuro educativo con KidVault y Global Seguros!`);
            return;
        }

        alert('¡Validaciones correctas! Procesando su plan educativo en KidVault...');
    });
});