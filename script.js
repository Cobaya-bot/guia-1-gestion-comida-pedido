// =====================================
// PRODUCTOS
// =====================================

const productos = [

    {
        id: 1,
        nombre: "Hamburguesa Clásica",
        descripcion: "Carne, queso, lechuga, tomate y papas.",
        precio: 15,
        categoria: "hamburguesas",
        icono: "🍔"
    },

    {
        id: 2,
        nombre: "Hamburguesa Especial",
        descripcion: "Carne doble, queso, tocino y salsa especial.",
        precio: 22,
        categoria: "hamburguesas",
        icono: "🍔"
    },

    {
        id: 3,
        nombre: "Pollo Broaster",
        descripcion: "Pollo crocante acompañado de papas.",
        precio: 18,
        categoria: "pollo",
        icono: "🍗"
    },

    {
        id: 4,
        nombre: "Pollo a la Brasa",
        descripcion: "Cuarto de pollo con papas y ensalada.",
        precio: 20,
        categoria: "pollo",
        icono: "🍗"
    },

    {
        id: 5,
        nombre: "Pizza Familiar",
        descripcion: "Pizza familiar con queso, jamón y pepperoni.",
        precio: 35,
        categoria: "pizza",
        icono: "🍕"
    },

    {
        id: 6,
        nombre: "Pizza Personal",
        descripcion: "Pizza personal con ingredientes a elección.",
        precio: 18,
        categoria: "pizza",
        icono: "🍕"
    },

    {
        id: 7,
        nombre: "Inca Kola",
        descripcion: "Bebida gaseosa de 500 ml.",
        precio: 4,
        categoria: "bebidas",
        icono: "🥤"
    },

    {
        id: 8,
        nombre: "Gaseosa Personal",
        descripcion: "Gaseosa de 500 ml.",
        precio: 4,
        categoria: "bebidas",
        icono: "🥤"
    }

];


// =====================================
// CARRITO
// =====================================

let carrito =
    JSON.parse(localStorage.getItem("carrito")) || [];

let categoriaActual = "todos";


// =====================================
// MOSTRAR PRODUCTOS
// =====================================

function mostrarProductos(lista = productos) {

    const contenedor =
        document.getElementById("productos");

    contenedor.innerHTML = "";

    if (lista.length === 0) {

        contenedor.innerHTML = `
            <p>No se encontraron productos.</p>
        `;

        return;
    }

    lista.forEach(producto => {

        contenedor.innerHTML += `

            <article class="producto">

                <div class="producto-imagen">
                    ${producto.icono}
                </div>

                <div class="producto-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <div class="precio">
                        S/. ${producto.precio.toFixed(2)}
                    </div>

                    <button
                        class="btn-agregar"
                        onclick="agregarAlCarrito(${producto.id})">

                        Agregar al carrito

                    </button>

                </div>

            </article>

        `;

    });

}


// =====================================
// AGREGAR AL CARRITO
// =====================================

function agregarAlCarrito(id) {

    const producto =
        productos.find(p => p.id === id);

    const existente =
        carrito.find(p => p.id === id);

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            ...producto,

            cantidad: 1

        });

    }

    guardarCarrito();

    actualizarCarrito();

}


// =====================================
// GUARDAR CARRITO
// =====================================

function guardarCarrito() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}


// =====================================
// ACTUALIZAR CONTADOR
// =====================================

function actualizarCarrito() {

    const cantidad =
        carrito.reduce(
            (total, producto) =>
                total + producto.cantidad,
            0
        );

    document.getElementById(
        "contadorCarrito"
    ).textContent = cantidad;

}


// =====================================
// MOSTRAR CARRITO
// =====================================

function mostrarCarrito() {

    document.getElementById(
        "modalCarrito"
    ).style.display = "flex";

    actualizarVistaCarrito();

}


// =====================================
// CERRAR CARRITO
// =====================================

function cerrarCarrito() {

    document.getElementById(
        "modalCarrito"
    ).style.display = "none";

}


// =====================================
// MOSTRAR ITEMS
// =====================================

function actualizarVistaCarrito() {

    const contenedor =
        document.getElementById("carritoItems");

    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <p>Tu carrito está vacío.</p>
        `;

    } else {

        contenedor.innerHTML = "";

        carrito.forEach(producto => {

            contenedor.innerHTML += `

                <div class="carrito-item">

                    <div>

                        <strong>
                            ${producto.nombre}
                        </strong>

                        <br>

                        S/. ${producto.precio.toFixed(2)}

                    </div>

                    <div class="carrito-controles">

                        <button
                            onclick="cambiarCantidad(${producto.id}, -1)">
                            -
                        </button>

                        <span>
                            ${producto.cantidad}
                        </span>

                        <button
                            onclick="cambiarCantidad(${producto.id}, 1)">
                            +
                        </button>

                        <button
                            class="btn-eliminar"
                            onclick="eliminarProducto(${producto.id})">
                            ✕
                        </button>

                    </div>

                </div>

            `;

        });

    }

    calcularTotales();

}


// =====================================
// CAMBIAR CANTIDAD
// =====================================

function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(p => p.id !== id);

    }

    guardarCarrito();

    actualizarCarrito();

    actualizarVistaCarrito();

}


// =====================================
// ELIMINAR
// =====================================

function eliminarProducto(id) {

    carrito =
        carrito.filter(p => p.id !== id);

    guardarCarrito();

    actualizarCarrito();

    actualizarVistaCarrito();

}


// =====================================
// CALCULAR TOTALES
// =====================================

function calcularTotales() {

    const subtotal =
        carrito.reduce(

            (total, producto) =>

                total +
                producto.precio *
                producto.cantidad,

            0

        );

    const delivery =
        carrito.length > 0 ? 5 : 0;

    const total =
        subtotal + delivery;

    document.getElementById(
        "subtotal"
    ).textContent =
        `S/. ${subtotal.toFixed(2)}`;

    document.getElementById(
        "delivery"
    ).textContent =
        `S/. ${delivery.toFixed(2)}`;

    document.getElementById(
        "total"
    ).textContent =
        `S/. ${total.toFixed(2)}`;

}


// =====================================
// FORMULARIO
// =====================================

function mostrarFormulario() {

    if (carrito.length === 0) {

        alert("Agrega productos al carrito.");

        return;
    }

    cerrarCarrito();

    document.getElementById(
        "modalPedido"
    ).style.display = "flex";

}


function cerrarFormulario() {

    document.getElementById(
        "modalPedido"
    ).style.display = "none";

}


// =====================================
// CONFIRMAR PEDIDO
// =====================================

document.getElementById(
    "formPedido"
).addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const nombre =
            document.getElementById(
                "nombre"
            ).value.trim();

        const telefono =
            document.getElementById(
                "telefono"
            ).value.trim();

        const direccion =
            document.getElementById(
                "direccion"
            ).value.trim();

        const pago =
            document.getElementById(
                "pago"
            ).value;

        if (
            !nombre ||
            !telefono ||
            !direccion ||
            !pago
        ) {

            alert(
                "Completa todos los campos."
            );

            return;

        }

        const subtotal =
            carrito.reduce(

                (total, producto) =>

                    total +
                    producto.precio *
                    producto.cantidad,

                0

            );

        const delivery = 5;

        const total =
            subtotal + delivery;

        const numeroPedido =
            "PED-" +
            Date.now();

        const pedido = {

            numero: numeroPedido,

            cliente: {

                nombre,
                telefono,
                direccion

            },

            productos: [...carrito],

            subtotal,

            delivery,

            total,

            pago,

            fecha:
                new Date().toLocaleString()

        };


        // Guardar pedido

        const pedidos =
            JSON.parse(
                localStorage.getItem(
                    "pedidos"
                )
            ) || [];

        pedidos.push(pedido);

        localStorage.setItem(
            "pedidos",
            JSON.stringify(pedidos)
        );


        // Limpiar carrito

        carrito = [];

        guardarCarrito();

        actualizarCarrito();


        // Limpiar formulario

        document.getElementById(
            "formPedido"
        ).reset();

        cerrarFormulario();


        // Mostrar confirmación

        document.getElementById(
            "numeroPedido"
        ).textContent =
            `Número de pedido: ${numeroPedido}`;

        document.getElementById(
            "mensajeExito"
        ).style.display = "flex";

    }
);


// =====================================
// CERRAR MENSAJE
// =====================================

function cerrarMensaje() {

    document.getElementById(
        "mensajeExito"
    ).style.display = "none";

}


// =====================================
// FILTRAR CATEGORÍA
// =====================================

function filtrarCategoria(categoria) {

    categoriaActual = categoria;

    document
        .querySelectorAll(".categoria")
        .forEach(btn =>
            btn.classList.remove("activa")
        );

    event.target.classList.add("activa");

    filtrarProductos();

}


// =====================================
// BUSCAR PRODUCTOS
// =====================================

function filtrarProductos() {

    const texto =
        document.getElementById(
            "buscador"
        ).value.toLowerCase();

    let resultado =
        productos.filter(producto => {

            const coincideCategoria =
                categoriaActual === "todos" ||
                producto.categoria ===
                categoriaActual;

            const coincideTexto =
                producto.nombre
                    .toLowerCase()
                    .includes(texto);

            return (
                coincideCategoria &&
                coincideTexto
            );

        });

    mostrarProductos(resultado);

}


// =====================================
// INICIALIZAR
// =====================================

mostrarProductos();

actualizarCarrito();