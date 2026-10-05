document.addEventListener("DOMContentLoaded", function () {

    const menu = document.querySelector(".menu");
    const menuHamburguesa = document.querySelector(".menuhamburguesa");
    const menuCerrar = document.querySelector(".menu-cerrar");
    const merch = document.querySelector('.menuopciones a[href$="#merch"]');

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

     const volverArriba = document.querySelector(".volver-arriba");
    volverArriba.addEventListener("click", function () {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    });

});