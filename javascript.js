const menu = document.querySelector(".menu");
const menuHamburguesa = document.querySelector(".menuhamburguesa");
const menuCerrar = document.querySelector(".menu-cerrar");

menu.addEventListener("click", function() {
    menuHamburguesa.style.display = "block";
});

menuCerrar.addEventListener("click", function() {
    menuHamburguesa.style.display = "none";
});