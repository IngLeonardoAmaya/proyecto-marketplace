$(document).ready(function() {
    // Contador de visitas
    let visits = localStorage.getItem('visitCount');
    if (visits === null) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    localStorage.setItem('visitCount', visits);
    $('#visitCount').text(visits);

    $('#toggle-sidebar').on('click', function() {
        $('#sidebar').toggleClass('open');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#sidebar').length && 
            !$(e.target).closest('#toggle-sidebar').length) {
            $('#sidebar').removeClass('open');
        }
    });

    $('#sidebar a').on('click', function(e) {
        e.preventDefault();
        $('#sidebar a').removeClass('active');
        $(this).addClass('active');
        const sectionToShow = $(this).data('section');
        $('.section-content').hide();
        $('#' + sectionToShow).show();
        $('#sidebar').removeClass('open');
    });

    $('.section-content').hide();
    $('#catalogo').show();
    $('#sidebar a[data-section="catalogo"]').addClass('active');

    const instaladores = [
        {
            nombre: 'Juan Pérez',
            ubicacion: 'Ciudad A',
            certificaciones: ['Certificación A'],
            experiencia: 5,
            valoracion: 4.5,
            img: 'images/avatar1.webp'
        },
        {
            nombre: 'Ana Gómez',
            ubicacion: 'Ciudad B',
            certificaciones: ['Certificación B'],
            experiencia: 3,
            valoracion: 4.0,
            img: 'images/avatar2.webp'
        },
        {
            nombre: 'Luis Ramírez',
            ubicacion: 'Ciudad C',
            certificaciones: ['Certificación A', 'Certificación B'],
            experiencia: 8,
            valoracion: 4.8,
            img: 'images/avatar3.webp'
        }
    ];

    function cargarInstaladores(filtros = {}) {
        const instaladoresList = $('#instaladores-list');
        instaladoresList.empty();
        let instaladoresFiltrados = 0;

        instaladores.forEach(instalador => {
            let ciudadSeleccionada;
            switch (filtros.ubicacion) {
                case '1': ciudadSeleccionada = 'Ciudad A'; break;
                case '2': ciudadSeleccionada = 'Ciudad B'; break;
                case '3': ciudadSeleccionada = 'Ciudad C'; break;
                default: ciudadSeleccionada = null;
            }

            let certificacionSeleccionada;
            switch (filtros.certificacion) {
                case '1': certificacionSeleccionada = 'Certificación A'; break;
                case '2': certificacionSeleccionada = 'Certificación B'; break;
                default: certificacionSeleccionada = null;
            }

            const coincideUbicacion = !filtros.ubicacion || ciudadSeleccionada === null || instalador.ubicacion === ciudadSeleccionada;
            const coincideCertificacion = !filtros.certificacion || certificacionSeleccionada === null || instalador.certificaciones.includes(certificacionSeleccionada);

            if (coincideUbicacion && coincideCertificacion) {
                const instaladorItem = `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${instalador.img}" class="card-img-top" alt="${instalador.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${instalador.nombre}</h5>
                                <p class="card-text">Ubicación: ${instalador.ubicacion}</p>
                                <p class="card-text">Certificaciones: ${instalador.certificaciones.join(', ')}</p>
                                <p class="card-text">Experiencia: ${instalador.experiencia} años</p>
                                <p class="card-text">Valoración: ${instalador.valoracion} ⭐</p>
                                <button class="btn btn-primary solicitar-servicio" data-nombre="${instalador.nombre}">Solicitar Servicio</button>
                            </div>
                        </div>
                    </div>
                `;
                instaladoresList.append(instaladorItem);
                instaladoresFiltrados++;
            }
        });

        if (instaladoresFiltrados === 0) {
            instaladoresList.append(`
                <div class="col-12">
                    <div class="alert alert-warning text-center" role="alert">
                        No hay instaladores que coincidan con los filtros seleccionados.
                    </div>
                </div>
            `);
        }
    }

    cargarInstaladores();

    $('#ubicacionFiltro').on('change', function() {
        const ubicacion = $(this).val();
        const certificacion = $('#certificacionFiltro').val();
        cargarInstaladores({ ubicacion, certificacion });
    });

    $('#certificacionFiltro').on('change', function() {
        const ubicacion = $('#ubicacionFiltro').val();
        const certificacion = $(this).val();
        cargarInstaladores({ ubicacion, certificacion });
    });

    $(document).on('click', '.solicitar-servicio', function() {
        const nombreInstalador = $(this).data('nombre');
        alert(`Has solicitado el servicio de ${nombreInstalador}`);
    });

    const productos = [
        { nombre: 'Panel Solar 100W', precio: 500, potencia: 100, eficiencia: '15%', img: 'images/solar-panels-4982779_1280.jpg' },
        { nombre: 'Panel Solar 150W', precio: 700, potencia: 150, eficiencia: '16%', img: 'images/solar-panels-4985342_1280.jpg' },
        { nombre: 'Panel Solar 200W', precio: 800, potencia: 200, eficiencia: '18%', img: 'images/solar-8244680_1280.jpg' },
        { nombre: 'Panel Solar 300W', precio: 1200, potencia: 300, eficiencia: '20%', img: 'images/solar-panels-4982779_1280.jpg' },
        { nombre: 'Panel Solar 400W', precio: 1500, potencia: 400, eficiencia: '21%', img: 'images/solar-panels-4985342_1280.jpg' },
        { nombre: 'Panel Solar 500W', precio: 2000, potencia: 500, eficiencia: '22%', img: 'images/solar-8244680_1280.jpg' },
        { nombre: 'Panel Solar 600W', precio: 2500, potencia: 600, eficiencia: '23%', img: 'images/solar-panels-4982779_1280.jpg' },
        { nombre: 'Panel Solar 800W', precio: 3500, potencia: 800, eficiencia: '24%', img: 'images/solar-panels-4985342_1280.jpg' },
        { nombre: 'Panel Solar 1000W', precio: 4500, potencia: 1000, eficiencia: '25%', img: 'images/solar-8244680_1280.jpg' }
    ];

    function cargarProductos(filtros = {}) {
        const productList = $('#product-list');
        productList.empty();
        let productosFiltrados = 0;

        productos.forEach(producto => {
            const coincidePrecio = !filtros.precio || filtros.precio == 0 || 
                (filtros.precio == 1 && producto.precio < 1000) ||
                (filtros.precio == 2 && producto.precio >= 1000 && producto.precio <= 5000) ||
                (filtros.precio == 3 && producto.precio > 5000);

            const coincidePotencia = !filtros.potencia || filtros.potencia == 0 ||
                (filtros.potencia == 1 && producto.potencia < 200) ||
                (filtros.potencia == 2 && producto.potencia >= 200 && producto.potencia <= 500) ||
                (filtros.potencia == 3 && producto.potencia > 500);

            if (coincidePrecio && coincidePotencia) {
                const productItem = `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Precio: $${producto.precio}</p>
                                <p class="card-text">Potencia: ${producto.potencia}W</p>
                                <p class="card-text">Eficiencia: ${producto.eficiencia}</p>
                            </div>
                        </div>
                    </div>
                `;
                productList.append(productItem);
                productosFiltrados++;
            }
        });

        if (productosFiltrados === 0) {
            productList.append(`
                <div class="col-12">
                    <div class="alert alert-warning text-center" role="alert">
                        No tenemos en stock productos que coincidan con los filtros seleccionados.
                    </div>
                </div>
            `);
        }
    }

    cargarProductos();

    $('#precio').on('change', function() {
        const precio = parseInt($(this).val());
        const potencia = parseInt($('#potencia').val());
        cargarProductos({ precio, potencia });
    });

    $('#potencia').on('change', function() {
        const precio = parseInt($('#precio').val());
        const potencia = parseInt($(this).val());
        cargarProductos({ precio, potencia });
    });

    $('#calcular-btn').on('click', function() {
        const consumo = parseFloat($('#consumo').val());
        const horasSol = parseFloat($('#ubicacion').val());
        const potenciaPanel = parseFloat($('#panel').val());

        if (isNaN(consumo) || isNaN(horasSol) || isNaN(potenciaPanel)) {
            $('#resultado').text('Por favor ingresa todos los valores correctamente.').show();
            return;
        }

        const energiaGeneradaMensual = (potenciaPanel * horasSol * 30) / 1000;
        let ahorro = energiaGeneradaMensual - consumo;
        if (ahorro < 0) ahorro = 0;

        const potenciaNecesaria = consumo / (horasSol * 30) * 1000;
        const panelRecomendado = productos.find(producto => producto.potencia >= potenciaNecesaria);

        let recomendacionHTML = '';
        if (panelRecomendado) {
            recomendacionHTML = `
                <h4>Recomendación de Panel Solar:</h4>
                <div class="card h-100 mt-3">
                    <img src="${panelRecomendado.img}" class="card-img-top" alt="${panelRecomendado.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${panelRecomendado.nombre}</h5>
                        <p class="card-text">Precio: $${panelRecomendado.precio}</p>
                        <p class="card-text">Potencia: ${panelRecomendado.potencia}W</p>
                        <p class="card-text">Eficiencia: ${panelRecomendado.eficiencia}</p>
                    </div>
                </div>
            `;
        } else {
            recomendacionHTML = '<p>No tenemos paneles solares en stock que cumplan con la potencia necesaria.</p>';
        }

        $('#resultado').html(`
            <strong>Resultados:</strong><br>
            Energía generada al mes: ${energiaGeneradaMensual.toFixed(2)} kWh<br>
            Ahorro potencial mensual: ${ahorro.toFixed(2)} kWh<br>
            ${recomendacionHTML}
        `).show();
    });

    $(document).on('click', '.solicitar-financiamiento', function() {
        const tipoFinanciamiento = $(this).data('financiamiento');
        alert(`Has seleccionado la opción de financiamiento: ${tipoFinanciamiento}`);
    });

    $('#calcular-financiamiento-btn').on('click', function() {
        const monto = parseFloat($('#monto').val());
        const plazo = parseInt($('#plazo').val());

        if (isNaN(monto) || monto <= 0) {
            $('#resultado-financiamiento').text('Por favor, introduce un monto válido.').show();
            return;
        }

        let tasaInteres;
        switch (plazo) {
            case 12: tasaInteres = 0.10; break;
            case 24: tasaInteres = 0.12; break;
            case 36: tasaInteres = 0.15; break;
            default: tasaInteres = 0.10;
        }

        const interesTotal = monto * tasaInteres;
        const costoTotal = monto + interesTotal;
        const cuotaMensual = costoTotal / plazo;

        $('#resultado-financiamiento').html(`
            <strong>Resultados del Financiamiento:</strong><br>
            Monto financiado: $${monto.toFixed(2)}<br>
            Tasa de interés: ${(tasaInteres * 100).toFixed(2)}%<br>
            Costo total a pagar: $${costoTotal.toFixed(2)}<br>
            Cuota mensual: $${cuotaMensual.toFixed(2)}<br>
            Plazo: ${plazo} meses
        `).show();
    });
});