document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-descargar-pdf');

    if (btn) {
      const targetId = btn.dataset.target;
      const filename = btn.dataset.filename || 'documento.pdf';

      const element = document.getElementById(targetId);

      if (!element) {
        console.error(`Error: No se encontró el elemento con ID '${targetId}'`);
        return;
      }

      const opciones = {
        margin:       10,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      if (typeof html2pdf !== 'undefined') {
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = '⏳ Generando...';
        btn.style.opacity = '0.7';

        html2pdf().set(opciones).from(element).save().then(() => {
          btn.innerHTML = textoOriginal;
          btn.style.opacity = '1';
        });
      } else {
        alert("Error: La librería html2pdf no se cargó correctamente.");
      }
    }
  });
});