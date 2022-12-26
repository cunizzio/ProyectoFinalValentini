let carrito = JSON.parse(localStorage.getItem("productosElegidos")) || []

const listas = document.querySelector(".ListasDePrecios")
const modalContainer = document.querySelector(".modal-body")
const precioTotal = document.querySelector("#precioTotal")
const vaciarCarrito = document.querySelector("#vaciarCarrito")

fetch("./productos.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((producto) => {

            let div_prod = document.createElement("div")
            div_prod.classList.add("cards__listas")

            div_prod.innerHTML = `
            <div class="imgContainer">
                <img class="img" src="${producto.img}" alt="">
            </div>
            <div class="descProd">
                <h3 class="titulos__listas">${producto.nombre}</h3>
                <h4 class="titulos__listas">U$S ${producto.precio}</h4>
            </div>
        `

            const button = document.createElement(`button`)
            button.className = "class= btn btn-primary"
            button.innerHTML = `Agregar`

            button.addEventListener(`click`, () => {
                agregarAlCarrito(producto.id)

                Toastify({
                    text: "Producto agregado",
                    duration: 3000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
            })

            div_prod.append(button)

            listas.append(div_prod);
        });
    })

let agregarAlCarrito = (id) => {

    fetch("./productos.json")
        .then((response) => response.json())
        .then((data) => {

            const producto = data.find((x) => x.id == id);

            carrito.push(producto)

            enviarAlCarrito()

            totalProductos()

            localStorage.setItem("productosElegidos", JSON.stringify(carrito));
        })
}

const enviarAlCarrito = () => {

    modalContainer.innerHTML = ""

    carrito.forEach((producto) => {
        const div = document.createElement("div")
        div.className = "productosModal"
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>U$S ${producto.precio}</p>
        `
        modalContainer.append(div)

    })
}

enviarAlCarrito()

let totalProductos = () => {
    let costo_total = 0

    carrito.forEach((producto) => {
        costo_total += producto.precio
    })

    precioTotal.innerText = costo_total
}

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    enviarAlCarrito ()
    totalProductos ()
    localStorage.setItem("productosElegidos", JSON.stringify(carrito))
})
