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

        // Crear enlace <a>
        const a = document.createElement("a");
        a.href = ""; // para que sea clickeable
        a.textContent = categoria.descripcion;
        a.style.textDecoration = "none"; // sin subrayado por defecto
        a.style.color = "#0d6efd"; // color link bootstrap
        a.style.cursor = "pointer";

        // Agregar efecto hover via JS (opcional, puedes hacerlo con CSS también)
        a.addEventListener("mouseenter", () => {
            a.style.textDecoration = "underline";
        });
        a.addEventListener("mouseleave", () => {
            a.style.textDecoration = "none";
        });

        // Evento click para cambiar query string y recargar
        a.addEventListener("click", (e) => {
            e.preventDefault();
            const codCate = categoria.id_categoria; // o el nombre correcto de id
            window.location.search = `?codCate=${codCate}`;
        });

        li.appendChild(a);
        contenedorCate.appendChild(li);
    });
    })
    .catch(error => {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = '<div class="alert alert-danger">No se pudieron cargar los productos.</div>';
    });