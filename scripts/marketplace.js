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
        let texto = e.target.value;
        displayTitular.textContent = texto.trim() === "" ? "Blanca García" : texto;
    });

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

    function gestionarMetodoPago(metodo) {
        displayCardBrand.textContent = metodo.toUpperCase() === "DEBITO" ? "DÉBITO" : metodo.toUpperCase();
        
        const inputsTarjeta = camposTarjetaFisica.querySelectorAll('input');

        if (metodo === 'pse') {
            contenedorBanco.style.display = 'block';
            selectBanco.setAttribute('required', 'true');
            
            camposTarjetaFisica.style.display = 'none';
            inputsTarjeta.forEach(input => {
                input.removeAttribute('required');
                input.value = "";
            });
            displayTarjetaDigits.textContent = "3456";
        } else {
            contenedorBanco.style.display = 'none';
            selectBanco.removeAttribute('required');
            selectBanco.value = "";
            
            camposTarjetaFisica.style.display = 'block';
            inputsTarjeta.forEach(input => {
                input.setAttribute('required', 'true');
            });
        }
    }

    radioMetodos.forEach(radio => {
        radio.addEventListener('change', (e) => {
            gestionarMetodoPago(e.target.value);
        });
    });

    const metodoInicial = document.querySelector('input[name="metodo_pago"]:checked').value;
    gestionarMetodoPago(metodoInicial);

    inputFile.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            filePreview.textContent = e.target.files[0].name;
        } else {
            filePreview.textContent = "No se ha seleccionado ningún archivo";
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (calcularTotalCarrito() === 0) {
            alert('Debes seleccionar al menos un plan de seguros para finalizar la compra.');
            return;
        }

        alert('Procesando pago de planes de manera exitosa en KidVault. ¡Tu transacción ha sido aprobada!');
        form.reset();
        
        const inputsTarjeta = camposTarjetaFisica.querySelectorAll('input');
        inputsTarjeta.forEach(input => input.value = "");
        
        actualizarTicket();
        gestionarMetodoPago(document.querySelector('input[name="metodo_pago"]:checked').value);
        displayTitular.textContent = "Blanca García";
        displayTarjetaDigits.textContent = "3456";
        filePreview.textContent = "No se ha seleccionado ningún archivo";
    });
});