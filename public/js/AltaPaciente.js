document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-alta');
  const btnAbrir = document.getElementById('btn-iniciar-alta');
  const btnCerrar = document.getElementById('cerrar-modal');

  if (btnAbrir) {
    btnAbrir.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
});