document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-cuidados");
  const btnCerrar = document.getElementById("cerrar-modal-cuidados");
  
  const inputIdTratamiento = document.getElementById("input-id-tratamiento");
  const spanNombre = document.getElementById("nombre-tratamiento-display");

  document.querySelectorAll(".btn-administrar").forEach(btn => {
    btn.addEventListener("click", () => {
      inputIdTratamiento.value = btn.dataset.id;
      spanNombre.textContent = btn.dataset.nombre;
      modal.classList.remove("hidden");
    });
  });

  if (btnCerrar) btnCerrar.addEventListener("click", () => modal.classList.add("hidden"));
  window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
});