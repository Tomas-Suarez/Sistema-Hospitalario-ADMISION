document.addEventListener("DOMContentLoaded", () => {
  const formMedico = document.getElementById("form-medico");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const crearBtn = document.getElementById("btn-abrir-crearMedico");

  // Función para limpiar formulario y preparar para creación
  const limpiarFormulario = () => {
    formMedico.reset();
    document.getElementById("edit-id").value = "";
    formMedico.action = "/medicos/registro"; // acción de registro
    // Si existe input hidden _method, lo eliminamos
    const methodInput = formMedico.querySelector('input[name="_method"]');
    if (methodInput) methodInput.remove();
  };

  // Abrir modal de creación
  if (crearBtn) {
    crearBtn.addEventListener("click", () => {
      limpiarFormulario();
      modal.classList.remove("hidden");
    });
  }

  // Abrir modal de edición
  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const medicoId = btn.dataset.id;

      formMedico.action = `/medicos/actualizar/${medicoId}`;

      document.getElementById("edit-id").value = medicoId;
      document.getElementById("edit-nombre").value = btn.dataset.nombre || "";
      document.getElementById("edit-apellido").value = btn.dataset.apellido || "";
      document.getElementById("edit-documento").value = btn.dataset.documento || "";
      document.getElementById("edit-matricula").value = btn.dataset.matricula || "";

      const genero = btn.dataset.genero || "Masculino";
      document.getElementById("edit-genero").value = ["Masculino", "Femenino"].includes(genero) ? genero : "Masculino";

      document.getElementById("edit-id_especialidad").value = btn.dataset.especialidad || "";
      document.getElementById("edit-id_guardia").value = btn.dataset.guardia || "";

      // Crear o actualizar input hidden _method
      let methodInput = formMedico.querySelector('input[name="_method"]');
      if (!methodInput) {
        methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        formMedico.appendChild(methodInput);
      }
      methodInput.value = "PUT";

      modal.classList.remove("hidden");
    });
  });

  // Cerrar modal
  cerrarModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Validación de formulario antes de enviar
  formMedico.addEventListener("submit", (e) => {
    e.preventDefault();
    let valido = true;

    const nombre = document.getElementById("edit-nombre");
    const apellido = document.getElementById("edit-apellido");
    const documento = document.getElementById("edit-documento");
    const matricula = document.getElementById("edit-matricula");
    const especialidad = document.getElementById("edit-id_especialidad");
    const guardia = document.getElementById("edit-id_guardia");

    // Nombre
    if (nombre.value.trim().length < 3 || nombre.value.trim().length > 40) {
      nombre.setCustomValidity("El nombre debe tener entre 3 y 40 letras.");
      nombre.reportValidity();
      valido = false;
    } else nombre.setCustomValidity("");

    // Apellido
    if (apellido.value.trim().length < 3 || apellido.value.trim().length > 40) {
      apellido.setCustomValidity("El apellido debe tener entre 3 y 40 letras.");
      apellido.reportValidity();
      valido = false;
    } else apellido.setCustomValidity("");

    // Documento
    if (!/^\d{7,10}$/.test(documento.value.trim())) {
      documento.setCustomValidity("El DNI debe tener entre 7 y 10 números.");
      documento.reportValidity();
      valido = false;
    } else documento.setCustomValidity("");

    // Matrícula
    if (matricula.value.trim().length === 0) {
      matricula.setCustomValidity("Debe ingresar la matrícula.");
      matricula.reportValidity();
      valido = false;
    } else matricula.setCustomValidity("");

    // Especialidad
    if (!especialidad.value) {
      especialidad.setCustomValidity("Debe seleccionar una especialidad.");
      especialidad.reportValidity();
      valido = false;
    } else especialidad.setCustomValidity("");

    // Guardia
    if (!guardia.value) {
      guardia.setCustomValidity("Debe seleccionar una guardia.");
      guardia.reportValidity();
      valido = false;
    } else guardia.setCustomValidity("");

    if (valido) {
      formMedico.submit();
    }
  });
});
