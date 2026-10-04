/* ==========================================================
   FLUJO DE COMPRA (todo en la misma página)
   1. Entradas -> 2. Datos personales -> 3. Confirmación
   - "Añadir" (fase 1) lleva al formulario
   - "Confirmar" (fase 2) lleva a la confirmación
   - Se puede volver pulsando un paso ya completado del menú
   ========================================================== */

const MAX_ENTRADAS = 10;

/* ---------- Elementos ---------- */
const secciones = {
  1: document.getElementById("tickets"),
  2: document.getElementById("fase1"),
  3: document.getElementById("fase2"),
};

const pasos = document.querySelectorAll(".steps .step");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const selectTipo = document.getElementById("tipo");
const contadorEl = document.getElementById("contador");
const precioTotalEl = document.getElementById("preciototal");
const errorEl = document.getElementById("errorform");
const btnConfirmar = document.getElementById("confirmar");
const tituloFinal = document.getElementById("titulofinal"); // opcional
const datosFinal = document.getElementById("datosfinal"); // opcional
