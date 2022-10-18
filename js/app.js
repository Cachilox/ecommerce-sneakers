let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let fragment = document.createDocumentFragment();
const inputBuscador = document.querySelector(".filtro__input");
const btnBuscador = document.querySelector(".filtro__btn");
const loader = document.querySelector(".loader");

async function fetchAPI() {
  try {
    const URL = "./data.json";
    const response = await fetch(URL);
    const prod = await response.json();
    setTimeout(() => {
      loader.classList.add("hide-loader");
    }, 3499);
 
    setTimeout(() => {
      renderHTML(prod);
    }, 2000);

    // Listener
    btnBuscador.addEventListener("click", (e) => {
      e.preventDefault();
      loader.style.display = "block";
      setTimeout(() => {
        loader.style.display = "none";
      }, 1499);
      const filtro = filtarPorNombre(prod);
      renderHTML(filtro);
    });
  } catch (error) {
    console.log(error);
  }
}
//Funcion para mostrar las cards en el DOM
function renderHTML(arr) {
  const shopContainer = document.querySelector(".shop__content");
  shopContainer.innerHTML = "";
  setTimeout(() => {
    arr.forEach((product) => {
      const { id, name, price, img, cuota } = product;
      const div = document.createElement("div");
      div.classList.add("product");
      div.innerHTML = `
        <img class="product__img" src="${img}" alt="${name}">
        <h2 class="product__title">${name}</h2>
        <span class="product__price">$${price}</span>
        <p class="product__cuota">${cuota}</p> 
        <div class="product__envio">ENVÍO GRATIS</div>
        <button id="comprar-${id}" class="add-cart">Add to cart</button>
        `;
      fragment.append(div);
    });
    shopContainer.append(fragment)
    btnComprar(arr);
  }, 1500);
}

// Funcion donde le agregamos evento al boton comprar
function btnComprar(productos) {
  productos.forEach((producto) => {
    document
      .querySelector(`#comprar-${producto.id}`)
      .addEventListener("click", () => {
        agregarAlCarrito(producto);
        alertAddCart();
      });
  });
}

// Funcion donde agregamos productos al carrito
function agregarAlCarrito(producto) {
  let existe = carrito.some((prod) => prod.id === producto.id);
  let prodFind = carrito.find((prod) => prod.id === producto.id);
  existe === false ? (producto.cantidad = 1) : prodFind.cantidad++;
  existe || carrito.push(producto);
  mostrarCarrito(carrito);
  contador();
  total();
}

//Funcion para mostrar el carrito en el DOM
function mostrarCarrito(arr) {
  let cartContainer = document.querySelector(".cart__content");
  cartContainer.innerHTML = "";
  for (const producto of arr) {
    const { id, name, price, img, cantidad } = producto;
    let div = document.createElement("div");
    div.classList.add("cart-box");
    div.innerHTML = `
      <img class="cart-box__img" src="${img}" alt="${name}">
      <div class="cart-box__detail">
        <div class="cart-box__title">${name}</div>
        <div class="cart-box__price">${price}</div>
        <p>cantidad: ${cantidad}</p>
      </div>
      <!-- REMOVE CART -->
      <i id="eliminar-${id}" class='bx bxs-trash-alt cart-remove'></i>
      `;
    cartContainer.appendChild(div);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  botonEliminar();
  contador();
  total();
}

function botonEliminar() {
  let btnEliminar = document.querySelectorAll(".cart-remove");
  btnEliminar.forEach((el) => {
    el.addEventListener("click", (ev) => {
      let button = ev.target.id;
      eliminarProducto(button);
    });
  });
}

function contador() {
  let contador = document.querySelector("#counter");
  let total = carrito.reduce((acc, el) => acc + el.cantidad, 0);
  contador.innerText = total;
}

function total() {
  let total = document.querySelector(".total__price");
  let resultado = carrito.reduce((acc, el) => acc + el.price * el.cantidad, 0);
  total.innerText = `$${resultado.toFixed(2)}`;
  localStorage.setItem("total", JSON.stringify(resultado));
}

function eliminarProducto(producto) {
  let item = carrito.find((el) => `eliminar-${el.id}` === producto);
  let index = carrito.indexOf(item);
  carrito.splice(index, 1);
  mostrarCarrito(carrito);
  contador();
  total();
  alertRemovedCart();
}

const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click", buyOrder);

function buyOrder() {
  if (carrito.length <= 0) {
    cartEmpty();
    return;
  } else {
    alertBuyCart();
  }
}

function filtarPorNombre(arr) {
  let name = inputBuscador.value.toLowerCase();
  return arr.filter((e) => e.name.includes(name));
}

const cartBtn = document.querySelector("#cart-icon");
const cartTitle = document.querySelector(".cart__title");
const totalTitle = document.querySelector(".total__title");
const totalCounter = document.querySelector(".total__price");
const buttonCart = document.querySelector(".btn-buy");

cartBtn.addEventListener("click", () => {
  if (carrito == 0) {
    cartTitle.innerText = "Your cart is empty";
    totalTitle.style.display = "none";
    totalCounter.style.display = "none";
    buttonCart.style.display = "none";
  } else {
    cartTitle.innerText = "Your Cart";
    totalTitle.style.display = "block";
    totalCounter.style.display = "block";
    buttonCart.style.display = "block";
  }
});

fetchAPI();
mostrarCarrito(carrito);

function cleanCart() {
  const cartContent = cart.querySelector(".cart__content");
  cartContent.innerHTML = "";
  carrito = [];
  localStorage.removeItem("carrito");
  let total = document.querySelector(".total__price");
  total.innerText = `$0`;
  let contador = document.querySelector("#counter");
  contador.innerText = 0;
}

const btn = document.getElementById("button");
document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "default_service";
  const templateID = "template_v7bwdi7";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send";
      alertNewsletter()
    },
    (err) => {
      btn.value = "Send";
      alert(JSON.stringify(err));
    }
  );
});
