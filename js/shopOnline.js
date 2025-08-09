document.addEventListener("DOMContentLoaded", () => {
  const urlProductos = "https://backcvbgtmdesa.azurewebsites.net/api/productos";
  const urlCategorias = "https://backcvbgtmdesa.azurewebsites.net/api/categorias";

  const contenedorProductos = document.getElementById("contenedorProductos");
  const contenedorCategorias = document.getElementById("contenedorCategorias");
  const contadorCarrito = document.getElementById("contadorCarrito");

  let carrito = 0;
  let productosGlobal = []; // para guardar todos los productos
  let categoriasGlobal = []; // para guardar todas las categorías

  // Función para mostrar productos en el contenedor (puede recibir filtro de categoría)
  function mostrarProductos(filtroCategoriaId = null) {
    contenedorProductos.innerHTML = ""; // limpiar contenedor

    // Filtrar productos si filtroCategoriaId está definido
    const productosMostrar = filtroCategoriaId
      ? productosGlobal.filter(p => p.CategoriaId === filtroCategoriaId)
      : productosGlobal;

    if (productosMostrar.length === 0) {
      contenedorProductos.innerHTML = `<div class="alert alert-warning">No hay productos para esta categoría.</div>`;
      return;
    }

    productosMostrar.forEach(producto => {
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
            <a href="javascript:void(0)" class="btn btn-primary mt-auto agregarCarrito">Agregar al carrito</a>
          </div>
        </div>
      `;

      col.querySelector(".agregarCarrito").addEventListener("click", (e) => {
        e.preventDefault();
        carrito++;
        contadorCarrito.textContent = carrito;
      });

      contenedorProductos.appendChild(col);
    });
  }

  // Función para mostrar categorías dinámicamente
  function mostrarCategorias() {
    contenedorCategorias.innerHTML = ""; // limpiar contenedor

    // Opción: agregar categoría "Todas"
    const liTodas = document.createElement("li");
    liTodas.className = "list-group-item";
    liTodas.textContent = "Todas";
    liTodas.style.cursor = "pointer";
    liTodas.style.color = "#0d6efd";
    liTodas.style.fontWeight = "bold";
    liTodas.addEventListener("click", () => {
      mostrarProductos(null); // mostrar todos
      marcarCategoriaSeleccionada(null);
    });
    contenedorCategorias.appendChild(liTodas);

    categoriasGlobal.forEach(categoria => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = categoria.descripcion;
      li.style.cursor = "pointer";
      li.style.color = "#0d6efd";

      li.addEventListener("click", () => {
        mostrarProductos(categoria.id_categoria);
        marcarCategoriaSeleccionada(categoria.id_categoria);
      });

      contenedorCategorias.appendChild(li);
    });
  }

  // Función para marcar visualmente la categoría seleccionada
  function marcarCategoriaSeleccionada(idCategoria) {
    [...contenedorCategorias.children].forEach(li => {
      li.style.backgroundColor = "";
      li.style.color = "#0d6efd";
      if (
        (idCategoria === null && li.textContent === "Todas") ||
        (idCategoria !== null && li.textContent === categoriasGlobal.find(cat => cat.id_categoria === idCategoria)?.descripcion)
      ) {
        li.style.backgroundColor = "#0d6efd";
        li.style.color = "white";
      }
    });
  }

  // Cargar categorías y productos al inicio
  Promise.all([
    fetch(urlCategorias).then(res => res.json()),
    fetch(urlProductos).then(res => res.json())
  ]).then(([categorias, productos]) => {
    categoriasGlobal = categorias;
    productosGlobal = productos;
    console.log(categoriasGlobal);
    console.log(productosGlobal);
    
    
    mostrarCategorias();
    mostrarProductos();

    marcarCategoriaSeleccionada(null); // marca "Todas" al inicio
  }).catch(error => {
    console.error("Error al cargar datos:", error);
    contenedorProductos.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
    contenedorCategorias.innerHTML = '<div class="alert alert-danger">No se pudieron cargar las categorías.</div>';
  });
});
