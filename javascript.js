document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".menu");
    const menuHamburguesa = document.querySelector(".menuhamburguesa");
    const menuCerrar = document.querySelector(".menu-cerrar");
    const merch = document.querySelector('a[href="#merch"]');

    menu.addEventListener("click", function () {
        menuHamburguesa.style.display = "block";
    });

    menuCerrar.addEventListener("click", function () {
        menuHamburguesa.style.display = "none";
    });

    merch.addEventListener("click", function () {
        setTimeout(function () {
            menuHamburguesa.style.display = "none";
        }, 500);
    });

});