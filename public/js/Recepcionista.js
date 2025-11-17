$(document).ready(function () {
  $("#TablaRecepcionistas").DataTable({
    language: { url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json" },
  });

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
});