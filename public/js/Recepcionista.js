document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-editar");
  const btnAbrir = document.getElementById("btn-abrir-crear");
  const btnCerrar = document.getElementById("cerrar-modal");

  if (btnAbrir) {
    btnAbrir.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });
});