$(document).ready(function() {
  $('.select-multiple').select2({
    placeholder: "Seleccione opciones...",
    allowClear: true,
    width: '100%',
    dropdownParent: $('#modal-editar')
  });

  const modal = document.getElementById('modal-editar');
  const btnAbrir = document.getElementById('btn-editar-historia');
  const btnCerrar = document.getElementById('cerrar-modal');

  if (btnAbrir) {
    btnAbrir.addEventListener('click', function() {
      modal.classList.remove('hidden');
    });
  }

  if (btnCerrar) {
    btnCerrar.addEventListener('click', function() {
      modal.classList.add('hidden');
    });
  }

  window.addEventListener('click', function(e) {
    if (e.target == modal) {
      modal.classList.add('hidden');
    }
  });
});