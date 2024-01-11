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
    select.innerHTML = '';
    peliculas.forEach(pelicula => {
        const opcion = document.createElement('option');
        opcion.value = pelicula.price;
        opcion.textContent = `${pelicula.name} ${pelicula.price}€`;
        select.appendChild(opcion);
    });
    select.dispatchEvent(new Event('change'));
}

function crearAsientos() {
    const contenedor = document.querySelector('.container');
    for (let i = 0; i < 12; i++) {
        const fila = document.createElement('div');
        fila.className = 'row';
        for (let j = 0; j < 8; j++) {
            const asiento = document.createElement('div');
            asiento.className = 'seat';
            fila.appendChild(asiento);
        }
        contenedor.appendChild(fila);
    }
}

function marcarAsientosAleatorios() {
    document.querySelectorAll('.container .seat').forEach(asiento => {
        if (Math.random() < 0.2) {
            asiento.classList.add('occupied');
        }
    });
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
    selectPelicula.addEventListener('change', actualizarContadorYTotal);
}

cargarPeliculas();
crearAsientos();
marcarAsientosAleatorios();
agregarEventoClickAsiento();
agregarEventoCambioPelicula();