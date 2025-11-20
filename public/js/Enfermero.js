document.addEventListener("DOMContentLoaded", () => {
  const formEnfermero = document.getElementById("form-enfermero");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const crearBtn = document.getElementById("btn-abrir-crearEnfermero");
  
  const seccionUsuario = document.getElementById("seccion-usuario");
  const inputUsuario = document.getElementById("edit-usuario");
  const inputEmail = document.getElementById("edit-email");
  const inputPassword = document.getElementById("edit-password");

  const inputsValidacion = [
    "edit-nombre", "edit-apellido", "edit-documento", 
    "edit-matricula", "edit-id_guardia", 
    "edit-usuario", "edit-email", "edit-password" 
  ];

  inputsValidacion.forEach(id => {
    const input = document.getElementById(id);
    if(input) {
      input.addEventListener("input", () => {
        input.setCustomValidity(""); 
      });
    }
  });

  const limpiarFormulario = () => {
    formEnfermero.reset();
    document.getElementById("edit-id").value = "";
    formEnfermero.action = "/enfermeros/registro"; 
    
    const methodInput = formEnfermero.querySelector('input[name="_method"]');
    if (methodInput) methodInput.remove();

    if (seccionUsuario) {
      seccionUsuario.style.display = "block";
      inputUsuario.required = true;
      inputEmail.required = true;
      inputPassword.required = true;
    }
  };

  if (crearBtn) {
    crearBtn.addEventListener("click", () => {
      limpiarFormulario();
      modal.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const enfermeroId = btn.dataset.id;
      formEnfermero.action = "/enfermeros/actualizar"; 

      document.getElementById("edit-id").value = enfermeroId;
      document.getElementById("edit-nombre").value = btn.dataset.nombre || "";
      document.getElementById("edit-apellido").value = btn.dataset.apellido || "";
      document.getElementById("edit-documento").value = btn.dataset.documento || "";
      document.getElementById("edit-matricula").value = btn.dataset.matricula || "";

      const genero = btn.dataset.genero || "Masculino";
      document.getElementById("edit-genero").value = ["Masculino", "Femenino", "Otro"].includes(genero) ? genero : "Masculino";      
      document.getElementById("edit-id_guardia").value = btn.dataset.id_guardia || "";

      let methodInput = formEnfermero.querySelector('input[name="_method"]');
      if (!methodInput) {
        methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        formEnfermero.appendChild(methodInput);
      }
      methodInput.value = "PUT";

      if (seccionUsuario) {
        seccionUsuario.style.display = "none";
        inputUsuario.required = false;
        inputEmail.required = false;
        inputPassword.required = false;
      }

      modal.classList.remove("hidden");
    });
  });

  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  }

  formEnfermero.addEventListener("submit", (e) => {
    let valido = true;

    if (seccionUsuario && seccionUsuario.style.display !== "none") {
        if (!inputUsuario.value.trim()) {
            inputUsuario.setCustomValidity("El usuario es obligatorio.");
            inputUsuario.reportValidity();
            valido = false;
        } else if (!inputEmail.value.trim() || !inputEmail.value.includes('@')) {
            inputEmail.setCustomValidity("Ingrese un email válido.");
            inputEmail.reportValidity();
            valido = false;
        } else if (inputPassword.value.length < 4) {
            inputPassword.setCustomValidity("La contraseña debe tener al menos 4 caracteres.");
            inputPassword.reportValidity();
            valido = false;
        }
    }

    if (!valido) { e.preventDefault(); return; }

    const nombre = document.getElementById("edit-nombre");
    const apellido = document.getElementById("edit-apellido");
    const documento = document.getElementById("edit-documento");
    const matricula = document.getElementById("edit-matricula");
    const guardia = document.getElementById("edit-id_guardia");

    // Validaciones básicas
    if (nombre.value.trim().length < 2) {
      nombre.setCustomValidity("El nombre debe tener al menos 2 letras.");
      nombre.reportValidity();
      valido = false;
    } 
    else if (apellido.value.trim().length < 2) {
      apellido.setCustomValidity("El apellido debe tener al menos 2 letras.");
      apellido.reportValidity();
      valido = false;
    } 
    else if (!/^\d{7,10}$/.test(documento.value.trim())) {
      documento.setCustomValidity("El DNI debe tener entre 7 y 10 números.");
      documento.reportValidity();
      valido = false;
    } 
    else if (matricula.value.trim().length === 0) {
      matricula.setCustomValidity("Debe ingresar la matrícula.");
      matricula.reportValidity();
      valido = false;
    }
    else if (!guardia.value) {
      guardia.setCustomValidity("Debe seleccionar una guardia.");
      guardia.reportValidity();
      valido = false;
    }

    if (!valido) {
      e.preventDefault();
    }
  });
});