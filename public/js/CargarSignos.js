document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-signos");
  const btnAbrir = document.getElementById("btn-nuevo-registro");
  const btnCerrar = document.getElementById("cerrar-modal-signos");

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

$(document).ready(function() {
  if ($('.datatable-estandar').length) {
    const table = $('.datatable-estandar').DataTable();    
    table.order([0, 'desc']).draw();
  }
});