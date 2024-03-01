// Definición de los aretes
let aretes = [
    { id: 1, img1: "./IMG/ar8.png", nombre: "Set De 1 Par De Candongas 1 Par De Topos y 1 Earcuff", precio: 49.900 },
    { id: 2, img1: "./IMG/ar2.png", nombre: "Arete 2 En 1 Corazón", precio: 29.900 },
    { id: 3, img1: "./IMG/ar1.png", nombre: "Set topos y earcuff de perlas", precio: 44.900 },
    { id: 4, img1: "./IMG/ar3.png", nombre: "Arete Solitario Sol", precio: 44.900 },
    { id: 5, img1: "./IMG/ar4.png", nombre: "Set Arete Cuff 2 en 1", precio: 44.900 },
    { id: 6, img1: "./IMG/ar5.png", nombre: "Set De 1 Par De Topos Y 1 Earcuff Mariposas", precio: 39.900 },
    { id: 7, img1: "./IMG/ar6.png", nombre: "Topos Maxi Corazón", precio: 34.900 },
    { id: 8, img1: "./IMG/ar7.png", nombre: "Set De 1 Par De Topos Y 1 Earcuff", precio: 29.900 },
    { id: 9, img1: "./IMG/ar9.png", nombre: "Set De 2 Pares De Topos Y 1 Earcuff", precio: 44.900 },
    { id: 10, img1: "./IMG/ar10.png", nombre: "Topitos Minicora Mayo", precio: 26.000 },
    { id: 11, img1: "./IMG/ar11.png", nombre: "Aretes Triangulos Circus", precio: 63.000 },
    { id: 12, img1: "./IMG/ar12.png", nombre: "Aretes Paz Acero", precio: 44.000 },
    { id: 13, img1: "./IMG/ar13.png", nombre: "Aretes Negros Milan", precio: 63.000 },
    { id: 14, img1: "./IMG/ar14.png", nombre: "Aretes Stars Elsa", precio: 45.999 },
    { id: 15, img1: "./IMG/ar15.png", nombre: "Aretes Ocre Tefani", precio: 63.000 },
    { id: 16, img1: "./IMG/ar16.png", nombre: "Aretes Corazon Chic", precio: 36.000 },
];


const contenedorBoton = document.getElementById('contenedor-botones');
let contenedorProductos;
let contenedorCarrito;
let precioTotal;
let cantidadProductos;
let productosComprados = [];
let totalCarrito = 0;
let cantidadProductosComprados = 0;


// Función para inicializar y cargar los eventos
function inicializar() {
    contenedorProductos = document.getElementById('tarjetas');
    contenedorCarrito = document.querySelector('.modal-body');
    precioTotal = document.getElementById('precio-total');
    cantidadProductos = document.getElementById('contador-carrito');
    cargarProductos();
    cargarEventos();
}

// Función para cargar los productos en la página
function cargarProductos() {
    aretes.forEach(item => {
        let tarj = document.createElement("div");
        tarj.className = "tarj";
        tarj.innerHTML = `
            <div class="cont_img_card">
                <img class="imgI" src="${item.img1}" alt="${item.nombre}">
            </div>
            <div class="cont_text_card">
                <div class="cont_nombre">
                    <h3 class="text_nombre">${item.nombre}</h3>
                </div>
                <div class="cont_precio">
                <h4 class="text_precio">$${item.precio.toFixed(3)}</h4>
                </div>
                <div class="cont_boton">
                    <button class="btn" data-id="${item.id}">Agregar al carrito</button>
                </div>  
            </div>
        `;
        contenedorProductos.appendChild(tarj);
    });
}

// Función para cargar los eventos
function cargarEventos() {
    contenedorProductos.addEventListener('click', agregarProducto);
    contenedorCarrito.addEventListener('click', eliminarProductoCarrito);
}

// Función para agregar un producto al carrito
function agregarProducto(e) {
    if (e.target.classList.contains('btn')) {
        const idProducto = parseInt(e.target.dataset.id);
        const productoSeleccionado = aretes.find(producto => producto.id === idProducto);
        if (productoSeleccionado) {
            const productoExistente = productosComprados.find(producto => producto.id === idProducto);
            if (productoExistente) {
                productoExistente.cantidad++;
                totalCarrito += productoExistente.precio;
            } else {
                const infoProducto = {
                    img: productoSeleccionado.img1,
                    id: productoSeleccionado.id,
                    nombre: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precio,
                    cantidad: 1
                };
                productosComprados.push(infoProducto);
                totalCarrito += infoProducto.precio;
            }
            cantidadProductosComprados = productosComprados.reduce((total, producto) => total + producto.cantidad, 0);
            actualizarCarrito();
        }
    }
}


// Definir una función para eliminar un producto del carrito
function eliminarProductoCarrito(id) {
    const index = productosComprados.findIndex(producto => producto.id === id);
    if (index !== -1) {
        const producto = productosComprados[index];
        let priceReduce = parseFloat(producto.precio) ;
        producto.cantidad--;
        Math.abs(producto.cantidad)
        totalCarrito -= priceReduce;
        if (producto.cantidad <= 0) {
            productosComprados.splice(index, 1);
        }
        if (totalCarrito < 0) {
            totalCarrito = 0;
            totalCarrito.toFixed(3)
        }
        cantidadProductosComprados = productosComprados.reduce((total, producto) => producto.cantidad - total , 0);
        actualizarCarrito();
    }
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    contenedorCarrito.innerHTML = '';
    productosComprados.forEach(producto => {
        const fila = document.createElement('div');
        fila.classList.add('producto-carrito');
        fila.innerHTML = `
            <div class="cont_img_carrito">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>
            <div class="cont_info_carrito">
                <h4>${producto.nombre}</h4> 
                <h4>$${producto.precio.toFixed(3)}</h4> 
                <h5>Cantidad: ${producto.cantidad}</h5>
            </div>
            <div class="cont_boton_carrito">
                <button class="btn-delete" data-id="${producto.id}">
                    <img src="./IMG/boton-x.png" alt="Eliminar">
                </button>
            </div>
        `;
        const botonEliminar = fila.querySelector('.btn-delete');
        botonEliminar.addEventListener('click', () => {
            const idProducto = parseInt(botonEliminar.dataset.id);
            eliminarProductoCarrito(idProducto);
        });
        contenedorCarrito.appendChild(fila);
    });
    precioTotal.textContent = `Total: $${totalCarrito.toFixed(3)}`;
    cantidadProductos.textContent = cantidadProductosComprados;
}

document.addEventListener('DOMContentLoaded', inicializar);


