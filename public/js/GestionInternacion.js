document.addEventListener("DOMContentLoaded", () => {
  
  const modalAlta = document.getElementById("modal-alta-admin");
  const modalIdentificar = document.getElementById("modal-identificar");
  const btnsIdentificar = document.querySelectorAll(".btn-identificar");
  const closeIdentificar = document.getElementById("cerrar-modal-identificar");
  const inputIdAdmisionIdent = document.getElementById("input-id-admision-identificar");

  if(btnsIdentificar) {
    btnsIdentificar.forEach(btn => {
      btn.addEventListener("click", () => {
        inputIdAdmisionIdent.value = btn.dataset.idadmision;
        modalIdentificar.classList.remove("hidden");
      });
    });
  }
  
  if(closeIdentificar) {
    closeIdentificar.addEventListener("click", () => {
      modalIdentificar.classList.add("hidden");
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modalIdentificar) modalIdentificar.classList.add("hidden");
  });
});