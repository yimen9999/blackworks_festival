(function () {
  "use strict";
  

  const MAX_ENTRADAS = 4;

  const secciones = {
    1: document.getElementById("tickets"), // primera pantalla de entradas dnd eliges
    2: document.getElementById("fase1"), // formulario
    3: document.getElementById("fase2"), // confirmación de compra
  };

  const pasos = document.querySelectorAll(".steps .step");
  const inputNombre = document.getElementById("nombre");
  const inputCorreo = document.getElementById("correo");
  const selectTipo = document.getElementById("tipo");
  const contadorEl = document.getElementById("contador");
  const precioTotalEl = document.getElementById("preciototal");
  const errorEl = document.getElementById("errorform");
  const btnConfirmar = document.getElementById("confirmar");
  const tituloFinal = document.getElementById("titulofinal"); 
  const datosFinal = document.getElementById("datosfinal"); 

  // dnd estas en el proceso de compra
  const estado = {
    fase: 1,
    tipo: null, // "vip", "general", "undia", "bonocopas"
    cantidad: 1,
  };

  const catalogo = {};
  document.querySelectorAll("#tickets [data-id]").forEach((li) => {
    catalogo[li.dataset.id] = {
      // busca el <li> con data-id, y guarda su nombre y precio en el catálogo
      nombre: li.dataset.nombre,
      precio: Number(li.dataset.precio), // lee el precio para lgo multiplicar por la cantidad de entradas
    };
  });

  /* Rellena el <select> con los mismos tipos de entrada */
  selectTipo.innerHTML =
    '<option value="" disabled selected>Tipo de entrada</option>';
  Object.entries(catalogo).forEach(([id, t]) => {
    const op = document.createElement("option");
    op.value = id;
    op.textContent = `${t.nombre} - ${t.precio}€`;
    selectTipo.appendChild(op);
  });

  /* ==========================================================
   CAMBIO DE FASE
   ========================================================== */
  function irAFase(n) {
    estado.fase = n;

    // solo se muestra la sección de la fase en la q estas y oculta las otras dos
    Object.entries(secciones).forEach(([num, sec]) => {
      sec.classList.toggle("oculto", Number(num) !== n);
    });

    // es lo q va cambindo la fase activando el css de cada una d ellas
    document.body.classList.remove("fase-1", "fase-2", "fase-3");
    document.body.classList.add("fase-" + n);

    // menú de pasos: activo, y clicables los ya completados
    pasos.forEach((p, i) => {
      const activo = i === n - 1;
      p.classList.toggle("is-active", activo); // se pone solo en el paso actual y en los anteriores, pero no en el último paso (confirmación) si es la fase 3
      p.classList.toggle("clicable", i < n - 1 && n < 3); // te dice en qué paso estás actualmente, para que los lectores de pantalla lo sepan
      if (activo) p.setAttribute("aria-current", "step");
      else p.removeAttribute("aria-current");
    });

    errorEl.textContent = "";
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  /* Volver a un paso anterior pulsando el menú (no desde la confirmación) */
  pasos.forEach((p, i) => {
    p.addEventListener("click", () => {
      const destino = i + 1;
      if (estado.fase < 3 && destino < estado.fase) irAFase(destino);
    });
  });

  /* ==========================================================
   FASE 1: ELEGIR ENTRADA
   ========================================================== */
  document.getElementById("tickets").addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-add");
    if (!boton) return;
    // e.target es el elemento donde se hizo clic, y .closest(".btn-add") busca hacia arriba el botón .btn-add.
    // Si el clic fue en cualquier otro sitio, boton es null y return sale de la función sin hacer nada.
    const li = boton.closest("[data-id]");
    estado.tipo = li.dataset.id;
    selectTipo.value = estado.tipo;
    actualizarTotal();
    irAFase(2);
    // guarda el id del dato seleccionado y pasa a la siguiente fase
  });

  /* ==========================================================
   FASE 2: FORMULARIO
   ========================================================== */
  function actualizarTotal() {
    const t = catalogo[estado.tipo];
    const total = t ? t.precio * estado.cantidad : 0;
    contadorEl.textContent = estado.cantidad;
    precioTotalEl.textContent = total + "€";
  }

  document.getElementById("sumar").addEventListener("click", () => {
    if (estado.cantidad < MAX_ENTRADAS) estado.cantidad++;
    actualizarTotal();
  });

  document.getElementById("restar").addEventListener("click", () => {
    if (estado.cantidad > 1) estado.cantidad--;
    actualizarTotal();
  });

  selectTipo.addEventListener("change", () => {
    estado.tipo = selectTipo.value;
    actualizarTotal();
  });
// añade o resta entradas hast llegar al maximo 
  function validar() {
    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

    if (nombre.length < 3) return "Escribe tu nombre y apellidos.";
    if (!correoValido) return "Escribe un correo electrónico válido.";
    if (!estado.tipo) return "Elige un tipo de entrada.";
    return "";
  }

  function confirmarCompra() {
    const error = validar();
    if (error) {
      errorEl.textContent = error;
      return;
    }

    // resumen (textContent: lo que escribe el usuario nunca se interpreta como HTML)
    const t = catalogo[estado.tipo];
    if (tituloFinal) tituloFinal.textContent = t.nombre;
    if (datosFinal) {
      datosFinal.textContent =
        `${inputNombre.value.trim()} · ${estado.cantidad} x ${t.nombre} · ` +
        `${t.precio * estado.cantidad}€`;
    }

    irAFase(3);
  }

  btnConfirmar.addEventListener("click", confirmarCompra);

  [inputNombre, inputCorreo].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") confirmarCompra();
    });
  });

  /* ---------- Inicio ---------- */
  actualizarTotal();
  irAFase(1);
})();
