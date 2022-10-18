// OPEN & CLOSE CART
const cartIcon = document.querySelector("#cart-icon")
const cart = document.querySelector(".cart")
const closeCart = document.querySelector("#cart-close")

cartIcon.addEventListener("click", ()=>{
  cart.classList.add("active")
  backgroundMenu.style.display = "block"
})

closeCart.addEventListener("click", ()=>{
  backgroundMenu.style.display = "none"
  cart.classList.remove("active")
})


// OPEN & CLOSE MENU

const btnMenu = document.querySelector(".bx-menu");
const closeMenu = document.querySelector("#icon-close");
const modalNavbar = document.querySelector(".modal-navbar");
const backgroundMenu = document.querySelector(".background")

btnMenu.addEventListener("click", () => {
  modalNavbar.classList.add("activeNav")
  backgroundMenu.style.display = "block"
})

closeMenu.addEventListener("click", hideMenu)

document.querySelector(".background").addEventListener("click", hideMenu)

function hideMenu() {
  modalNavbar.classList.remove("activeNav")
  backgroundMenu.style.display = "none"
  cart.classList.remove("active")
}


const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector(".select") 
  const caret = dropdown.querySelector(".caret")
  const menu = dropdown.querySelector(".menu")

  select.addEventListener("click", ()=> {
    select.classList.toggle("select-clicked")
    caret.classList.toggle("caret-rotate")
    menu.classList.toggle("menu-open")
  });
});