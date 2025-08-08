const url = "https://backcvbgtmdesa.azurewebsites.net/api/productos";
const contenedor = document.getElementById("contenedorProductos");
const contadorCarrito = document.getElementById("contadorCarrito");
let carrito = 0;

fetch(url)
    .then(response => response.json())
    .then(productos => {
    console.log(productos);
    productos.forEach(producto => {

        const col = document.createElement("div");
        col.className = "col-md-4 col-sm-12 p-2";

        let precioHTML = "";

        if (producto.EnOferta && producto.PrecioOferta != null) {
            precioHTML = `
                <span class="text-danger">$${parseFloat(producto.PrecioOferta).toFixed(2)}</span>
                <small class="text-muted text-decoration-line-through">$${parseFloat(producto.Precio).toFixed(2)}</small>
            `;
        } else {
            precioHTML = `$${parseFloat(producto.Precio).toFixed(2)}`;
        }

        col.innerHTML = `
            <div class="card">
            <img src="${producto.Imagen}" class="card-img-top" alt="${producto.Nombre}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${producto.Nombre}</h5>
                <p class="card-text">${producto.Descripcion}</p>
                <p class="fw-bold">${precioHTML}</p>
                <a href="#" class="btn btn-primary mt-auto agregarCarrito">Agregar al carrito</a>
            </div>
            </div>
        `;

        col.querySelector(".agregarCarrito").addEventListener("click", (e) => {
        e.preventDefault();
        carrito++;
        contadorCarrito.textContent = carrito;
        });

        contenedor.appendChild(col);
    });
    })
    .catch(error => {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
    });