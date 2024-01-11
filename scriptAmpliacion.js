// Crea un json que contendrá un listado de objetos película, dónde cada película
// tiene un nombre y un precio

// Deberás generar automáticamente:
// - Importar el json creado (usando fetch) y usar sus valores para crear las opciones y modificar los precios
// - La creación de las filas y asientos: <div class="seat"></div>
// - Algunos asientos de manera aleatoria estarán ocupados

// Ampliación: Crear un input para crear filas de asientos dinámicas
// Ampliación: Posicionar en la pantalla del cine, una imágen de la película seleccionada

function cargarPeliculas() {
    fetch('movies.json')
        .then(respuesta => respuesta.json())
        .then(datos => llenarSelect(datos.movie));
}

function llenarSelect(peliculas) {
    const select = document.getElementById('movie');
    const pantalla = document.querySelector('.screen');
    select.innerHTML = '';
    peliculas.forEach(pelicula => {
        const opcion = document.createElement('option');
        opcion.value = pelicula.price;
        opcion.textContent = `${pelicula.name} ${pelicula.price}€`;
        opcion.dataset.imageUrl = pelicula.imageUrl;
        select.appendChild(opcion);
    });
    select.dispatchEvent(new Event('change'));
}

function cambiarImagenPelicula() {
    const select = document.getElementById('movie');
    const pantalla = document.querySelector('.screen');
    const imageUrl = select.options[select.selectedIndex].dataset.imageUrl;
    pantalla.style.backgroundImage = `url('${imageUrl}')`;
}

function generarAsientos() {
    const numRowsInput = document.getElementById('numRows');
    const container = document.querySelector('.container-seat');
    const numRows = parseInt(numRowsInput.value);
    container.innerHTML = '';
    for (let i = 0; i < numRows; i++) {
        const fila = document.createElement('div');
        fila.className = 'row';
        for (let j = 0; j < 8; j++) {
            const asiento = document.createElement('div');
            asiento.className = 'seat';
            fila.appendChild(asiento);
            if (Math.random() < 0.1) {
                asiento.classList.add('occupied');
            }
        }
        container.appendChild(fila);
    }
}

function actualizarContadorYTotal() {
    const asientos = Array.from(document.querySelectorAll('.container .seat'));
    const asientosSeleccionados = asientos.filter(asiento => asiento.classList.contains('selected'));
    const cantidadAsientosSeleccionados = asientosSeleccionados.length;
    const selectPelicula = document.getElementById('movie');
    const precioPelicula = Number(selectPelicula.value);
    const precioTotal = cantidadAsientosSeleccionados * precioPelicula;
    const contador = document.getElementById('count');
    const total = document.getElementById('total');
    contador.textContent = cantidadAsientosSeleccionados;
    total.textContent = precioTotal;
}

function agregarEventoClickAsiento() {
    const asientos = Array.from(document.querySelectorAll('.container .seat'));
    asientos.forEach(asiento => {
        asiento.addEventListener('click', () => {
            if (!asiento.classList.contains('occupied')) {
                asiento.classList.toggle('selected');
                actualizarContadorYTotal();
            }
        });
    });
}

function agregarEventoCambioPelicula() {
    const selectPelicula = document.getElementById('movie');
    selectPelicula.addEventListener('change', () => {
        cambiarImagenPelicula();
        actualizarContadorYTotal();
    });
}

function agregarEventoClickGenerar() {
    const botonGenerar = document.getElementById('generate');
    botonGenerar.addEventListener('click', () => {
        generarAsientos();
        agregarEventoClickAsiento();
        actualizarContadorYTotal();
    });
}

cargarPeliculas();
agregarEventoCambioPelicula();
agregarEventoClickGenerar();