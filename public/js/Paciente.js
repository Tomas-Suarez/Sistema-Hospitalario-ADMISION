document.addEventListener("DOMContentLoaded", () => {
  const formPaciente = document.getElementById("form-paciente");
  const modal = document.getElementById("modal-editar");
  const cerrarModalBtn = document.getElementById("cerrar-modal");
  const crearBtn = document.getElementById("btn-abrir-crearPaciente");

  // Elementos para contactos dinámicos
  const containerContactos = document.getElementById("lista-contactos");
  const btnAddContacto = document.getElementById("btn-add-contacto");
  const templateContacto = document.getElementById("template-contacto");
  const msgSinContactos = document.getElementById("mensaje-sin-contactos");
  
  // === CAMBIO AQUÍ: LÍMITE DE 1 ===
  const MAX_CONTACTOS = 1; 

  // --- 1. FUNCIÓN AUXILIAR: ACTUALIZAR UI ---
  const actualizarUIContactos = () => {
    const cantidad = containerContactos.children.length;
    
    // Mostrar mensaje si no hay contactos
    if (cantidad === 0) {
        if (msgSinContactos) msgSinContactos.style.display = "block";
    } else {
        if (msgSinContactos) msgSinContactos.style.display = "none";
    }

    // Controlar botón +
    if (btnAddContacto) {
      if (cantidad >= MAX_CONTACTOS) {
          btnAddContacto.disabled = true;
          btnAddContacto.style.opacity = "0.5";
          btnAddContacto.title = "Solo se permite 1 contacto";
      } else {
          btnAddContacto.disabled = false;
          btnAddContacto.style.opacity = "1";
          btnAddContacto.title = "Agregar contacto";
      }
    }
  };

  const agregarFilaContacto = (nombre = "", telefono = "") => {
    if (containerContactos.children.length >= MAX_CONTACTOS) {
      alert("Solo se permite cargar 1 contacto de emergencia.");
      return;
    }

    const clone = templateContacto.content.cloneNode(true);
    const row = clone.querySelector(".contacto-row");
    
    const inputs = row.querySelectorAll("input");
    inputs[0].value = nombre;
    inputs[1].value = telefono;

    row.querySelector(".btn-remove-contacto").addEventListener("click", () => {
      row.remove();
      actualizarUIContactos();
    });

    containerContactos.appendChild(row);
    actualizarUIContactos();
  };

  const limpiarFormulario = () => {
    formPaciente.reset();
    document.getElementById("edit-id").value = "";
    formPaciente.action = "/pacientes/registro";
    
    containerContactos.innerHTML = "";
    actualizarUIContactos(); 

    const methodInput = formPaciente.querySelector('input[name="_method"]');
    if (methodInput) methodInput.remove();
  };

  if (crearBtn) {
    crearBtn.addEventListener("click", () => {
      limpiarFormulario();
      modal.classList.remove("hidden");
    });
  }

  document.querySelectorAll(".btn-editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pacienteId = btn.dataset.id;
      formPaciente.action = `/pacientes/actualizar/${pacienteId}`;

      // Cargar campos simples
      document.getElementById("edit-id").value = pacienteId;
      document.getElementById("edit-nombre").value = btn.dataset.nombre || "";
      document.getElementById("edit-apellido").value = btn.dataset.apellido || "";
      document.getElementById("edit-documento").value = btn.dataset.documento || "";
      document.getElementById("edit-telefono").value = btn.dataset.telefono || "";
      document.getElementById("edit-domicilio").value = btn.dataset.domicilio || "";
      document.getElementById("edit-estatura").value = btn.dataset.estatura || "";
      document.getElementById("edit-peso").value = btn.dataset.peso || "";
      document.getElementById("edit-seguro").value = btn.dataset.id_seguro || "null";

      // Fecha
      if (btn.dataset.fecha_nacimiento) {
         const fechaRaw = btn.dataset.fecha_nacimiento; 
         const fecha = new Date(fechaRaw);
         const isoDate = fecha.toISOString().split('T')[0];
         document.getElementById("edit-fecha_nacimiento").value = isoDate;
      }

      // Género
      const genero = btn.dataset.genero;
      document.getElementById("edit-genero").value = ["Masculino", "Femenino"].includes(genero) ? genero : "Masculino";

      // Cargar Contactos
      containerContactos.innerHTML = ""; // Limpiar anteriores
      const contactosData = btn.dataset.contactos; 
      
      if (contactosData) {
        try {
          const contactos = JSON.parse(contactosData);
          if (contactos.length > 0) {
            const c = contactos[0]; 
            agregarFilaContacto(c.nombre_completo, c.telefono);
          }
        } catch (e) {
          console.error("Error parseando contactos", e);
        }
      }
      
      actualizarUIContactos();

      let methodInput = formPaciente.querySelector('input[name="_method"]');
      if (!methodInput) {
        methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        formPaciente.appendChild(methodInput);
      }
      methodInput.value = "PUT";

      modal.classList.remove("hidden");
    });
  });

  if (btnAddContacto) {
    btnAddContacto.addEventListener("click", () => agregarFilaContacto());
  }

  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  formPaciente.addEventListener("submit", (e) => {
    let valido = true;
    const campos = ["edit-nombre", "edit-apellido", "edit-documento", "edit-telefono", "edit-domicilio", "edit-seguro"];

    campos.forEach((id) => {
        const input = document.getElementById(id);
        if(input) input.setCustomValidity("");
    });

    const nombre = document.getElementById("edit-nombre");
    if (nombre.value.trim().length < 3) {
        nombre.setCustomValidity("Mínimo 3 caracteres.");
        valido = false;
    }

    const dni = document.getElementById("edit-documento");
    if (!/^\d{7,10}$/.test(dni.value.trim())) {
        dni.setCustomValidity("DNI inválido (7-10 números).");
        valido = false;
    }

    const seguro = document.getElementById("edit-seguro");
    if (seguro.value === "") {
        seguro.setCustomValidity("Seleccione una opción.");
        valido = false;
    }

    if (!valido) {
        e.preventDefault();
        formPaciente.reportValidity();
    }
  });
});