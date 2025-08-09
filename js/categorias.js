const urlCategorias = "https://backcvbgtmdesa.azurewebsites.net/api/categorias";
const contenedorCate = document.getElementById("contenedorCategorias");

fetch(urlCategorias)
    .then(response => response.json())
    .then(categorias => {
    
    console.log(categorias);

    contenedorCate.innerHTML = "";
    
    categorias.forEach(categoria => {

        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = categoria.descripcion;

        contenedorCate.appendChild(li);
    });
    })
    .catch(error => {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
    });