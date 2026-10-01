document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".menu");
    const menuHamburguesa = document.querySelector(".menuhamburguesa");
    const menuCerrar = document.querySelector(".menu-cerrar");
    const menuEnlaces = document.querySelectorAll(".menuopciones a");

    menu.addEventListener("click", function () {
        menuHamburguesa.style.display = "block";
    });

    menuCerrar.addEventListener("click", function () {
        menuHamburguesa.style.display = "none";
    });

    menuEnlaces.forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            menuHamburguesa.style.display = "none";
        });
    });

});