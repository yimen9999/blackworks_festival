(function () {
  "use strict";

  const MAX_ENTRADAS = 4;

  const GASTOS_GESTION = 1.5;

  const secciones = {
    1: document.getElementById("tickets"),

    2: document.getElementById("fase1"),

    3: document.getElementById("fase2"),
  };

  // elementosssss
  const pasos = document.querySelectorAll(".steps .step");

  const inputNombre = document.getElementById("nombre");

  const inputCorreo = document.getElementById("correo");

  const selectTipo = document.getElementById("tipo");

  const precioTotalEl = document.getElementById("preciototal");

  const errorEl = document.getElementById("errorform");

  const btnConfirmar = document.getElementById("confirmar");

  const tituloFinal = document.getElementById("titulofinal");

  const datosFinal = document.getElementById("datosfinal");

  const btnAnterior = document.getElementById("anterior");

  //  elementos del resumen
  const resumenVacio = document.getElementById("resumenvacio");

  const resumenEntradas = document.getElementById("resumenentradas");

  const resumenCantidad = document.getElementById("resumencantidad");

  const resumenSubtotal = document.getElementById("resumensubtotal");

  const resumenGestion = document.getElementById("resumengestion");

  const resumenTotal = document.getElementById("resumentotal");

  const btnComprar = document.getElementById("comprar");

  const resumenFormulario = document.getElementById("resumenformulario");

  // compra
  const estado = {
    fase: 1,

    carrito: {
      vip: 0,

      general: 0,

      undia: 0,

      bonocopas: 0,
    },
  };

  // catalogo

  const catalogo = {};

  document.querySelectorAll("#tickets [data-id]").forEach((li) => {
    catalogo[li.dataset.id] = {
      nombre: li.dataset.nombre,

      precio: Number(li.dataset.precio),
    };
  });

  function formatoPrecio(precio) {
    return precio.toFixed(2).replace(".", ",") + " €";
  }

  // entradas total

  function obtenerCantidadTotal() {
    return Object.values(estado.carrito).reduce(
      (total, cantidad) => total + cantidad,
      0,
    );
  }

  //  subtotal

  function obtenerSubtotal() {
    return Object.entries(estado.carrito).reduce((total, [id, cantidad]) => {
      const entrada = catalogo[id];

      if (!entrada) {
        return total;
      }

      return total + entrada.precio * cantidad;
    }, 0);
  }

  // gastos de gestion
  function obtenerGestion() {
    return obtenerCantidadTotal() * GASTOS_GESTION;
  }

  // total

  function obtenerTotal() {
    return obtenerSubtotal() + obtenerGestion();
  }

  // actualiza contador
  function actualizarContadores() {
    document.querySelectorAll("#tickets [data-id]").forEach((li) => {
      const id = li.dataset.id;

      const contador = li.querySelector(".contador-ticket");

      if (contador) {
        contador.textContent = estado.carrito[id];
      }
    });
  }

  // actualiza resumen

  function actualizarResumen() {
    const cantidadTotal = obtenerCantidadTotal();

    const subtotal = obtenerSubtotal();

    const gestion = obtenerGestion();

    const total = obtenerTotal();

    //  resumen
    resumenCantidad.textContent = cantidadTotal;

    resumenSubtotal.textContent = formatoPrecio(subtotal);

    resumenGestion.textContent = formatoPrecio(gestion);

    resumenTotal.textContent = formatoPrecio(total);

    // resuemn pero vacio
    if (cantidadTotal === 0) {
      resumenVacio.style.display = "block";

      resumenEntradas.innerHTML = "";
    } else {
      resumenVacio.style.display = "none";

      resumenEntradas.innerHTML = "";

      Object.entries(estado.carrito).forEach(([id, cantidad]) => {
        if (cantidad <= 0) {
          return;
        }

        const entrada = catalogo[id];

        if (!entrada) {
          return;
        }

        const fila = document.createElement("div");

        fila.className = "resumen-entrada";

        const texto = document.createElement("div");

        texto.className = "resumen-entrada-texto";

        const nombre = document.createElement("span");

        nombre.className = "resumen-entrada-nombre";

        nombre.textContent = entrada.nombre;

        const cantidadTexto = document.createElement("span");

        cantidadTexto.className = "resumen-entrada-cantidad";

        cantidadTexto.textContent =
          cantidad + " x " + formatoPrecio(entrada.precio);

        texto.appendChild(nombre);

        texto.appendChild(cantidadTexto);

        const precio = document.createElement("strong");

        precio.className = "resumen-entrada-precio";

        precio.textContent = formatoPrecio(entrada.precio * cantidad);

        fila.appendChild(texto);

        fila.appendChild(precio);

        resumenEntradas.appendChild(fila);
      });
    }

    btnComprar.disabled = cantidadTotal === 0;

    // contadores

    actualizarContadores();

    actualizarResumenFormulario();
  }

  //  actualiza resumen

  function actualizarResumenFormulario() {
    if (!resumenFormulario) {
      return;
    }

    resumenFormulario.innerHTML = "";

    Object.entries(estado.carrito).forEach(([id, cantidad]) => {
      if (cantidad <= 0) {
        return;
      }

      const entrada = catalogo[id];

      if (!entrada) {
        return;
      }

      const fila = document.createElement("div");

      fila.className = "formulario-entrada";

      const nombre = document.createElement("span");

      nombre.textContent = cantidad + " x " + entrada.nombre;

      const precio = document.createElement("strong");

      precio.textContent = formatoPrecio(cantidad * entrada.precio);

      fila.appendChild(nombre);

      fila.appendChild(precio);

      resumenFormulario.appendChild(fila);
    });

    precioTotalEl.textContent = formatoPrecio(obtenerTotal());
  }

  // suma entrada

  function sumarEntrada(id) {
    const cantidadTotal = obtenerCantidadTotal();

    if (cantidadTotal >= MAX_ENTRADAS) {
      return;
    }

    estado.carrito[id]++;

    actualizarResumen();
  }

  // resta entrada
  function restarEntrada(id) {
    if (estado.carrito[id] <= 0) {
      return;
    }

    estado.carrito[id]--;

    actualizarResumen();
  }

  // eventos tickets

  document.getElementById("tickets").addEventListener("click", (e) => {
    const boton = e.target.closest("button");

    if (!boton) {
      return;
    }

    const li = boton.closest("[data-id]");

    if (!li) {
      return;
    }

    const id = li.dataset.id;

    if (boton.classList.contains("btn-add")) {
      sumarEntrada(id);
    }

    if (boton.classList.contains("btn-restar")) {
      restarEntrada(id);
    }
  });

  // lleva a fase
  function irAFase(n) {
    estado.fase = n;

    // boton q te devuelve a tickets
    btnAnterior.classList.toggle("oculto", n !== 2);

    Object.entries(secciones).forEach(([num, sec]) => {
      sec.classList.toggle("oculto", Number(num) !== n);
    });

    document.body.classList.remove("fase-1", "fase-2", "fase-3");

    document.body.classList.add("fase-" + n);

    // pasos
    pasos.forEach((paso, indice) => {
      const activo = indice === n - 1;

      paso.classList.toggle("is-active", activo);

      paso.classList.toggle("clicable", indice < n - 1 && n < 3);

      if (activo) {
        paso.setAttribute("aria-current", "step");
      } else {
        paso.removeAttribute("aria-current");
      }
    });

    //  limpiar error
    errorEl.textContent = "";

    //  devolver arriba
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  /* ==========================================================
     PASOS CLICABLES
     ========================================================== */

  pasos.forEach((paso, indice) => {
    paso.addEventListener("click", () => {
      const destino = indice + 1;

      if (estado.fase < 3 && destino < estado.fase) {
        irAFase(destino);
      }
    });
  });

  // boton comprar
  btnComprar.addEventListener("click", () => {
    if (obtenerCantidadTotal() === 0) {
      return;
    }

    irAFase(2);
  });

  // boton atras
  btnAnterior.addEventListener("click", () => {
    irAFase(1);
  });

  // validar formulario

  function validar() {
    const nombre = inputNombre.value.trim();

    const correo = inputCorreo.value.trim();

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (nombre.length < 3) {
      return "Escribe tu nombre y apellidos.";
    }

    if (!correoValido) {
      return "Escribe un correo electrónico válido.";
    }

    if (obtenerCantidadTotal() === 0) {
      return "Elige al menos una entrada.";
    }

    return "";
  }

  // crea el texto de la compra
  function crearTextoCompra() {
    const partes = [];

    Object.entries(estado.carrito).forEach(([id, cantidad]) => {
      if (cantidad <= 0) {
        return;
      }

      const entrada = catalogo[id];

      if (!entrada) {
        return;
      }

      partes.push(cantidad + " x " + entrada.nombre);
    });

    return partes.join(" · ");
  }

  // confirma la compra
  function confirmarCompra() {
    const error = validar();

    if (error) {
      errorEl.textContent = error;

      return;
    }

    const textoCompra = crearTextoCompra();

    //  final
    if (tituloFinal) {
      tituloFinal.textContent = "BLACKWORKS WEEKEND FESTIVAL";
    }

    //  dtos de compra
    if (datosFinal) {
      datosFinal.textContent =
        inputNombre.value.trim() +
        " · " +
        textoCompra +
        " · " +
        formatoPrecio(obtenerTotal());
    }

    // paso a fase 3
    irAFase(3);
  }

  btnConfirmar.addEventListener("click", confirmarCompra);

  [inputNombre, inputCorreo].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        confirmarCompra();
      }
    });
  });

  actualizarResumen();

  irAFase(1);
})();
