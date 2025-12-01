document.addEventListener("DOMContentLoaded", () => {
  
  const modalIdentificar = document.getElementById("modal-identificar");
  const btnsIdentificar = document.querySelectorAll(".btn-identificar");
  const closeIdentificar = document.getElementById("cerrar-modal-identificar");
  const inputIdAdmisionIdent = document.getElementById("input-id-admision-identificar");

  //Botones identificar solo para pacientes NN
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

  const modalCambio = document.getElementById("modal-cambio-habitacion");
  const btnsCambio = document.querySelectorAll(".btn-cambiar-habitacion");
  const closeCambio = document.getElementById("cerrar-modal-cambio");
  
  const inputIdAdmisionCambio = document.getElementById("input-id-admision-cambio");
  const inputIdPacienteCambio = document.getElementById("input-id-paciente-cambio");
  
  const selectAla = document.getElementById("select-ala-cambio");
  const selectHabitacion = document.getElementById("select-habitacion-cambio");

  if(btnsCambio) {
    btnsCambio.forEach(btn => {
      btn.addEventListener("click", () => {
        inputIdAdmisionCambio.value = btn.dataset.idadmision;
        inputIdPacienteCambio.value = btn.dataset.idpaciente; 
        
        selectAla.value = "";
        selectHabitacion.innerHTML = '<option disabled selected value="">-- Seleccione primero el Ala --</option>';
        selectHabitacion.disabled = true;

        modalCambio.classList.remove("hidden");
      });
    });
  }

  if(closeCambio) {
    closeCambio.addEventListener("click", () => {
      modalCambio.classList.add("hidden");
    });
  }

  // Detectamos cuando el usuario selecciona o cambia un ala.
  if(selectAla) {
    selectAla.addEventListener("change", async () => {
      const alaId = selectAla.value;
      const pacienteId = inputIdPacienteCambio.value;

      selectHabitacion.innerHTML = '<option disabled selected value="">Cargando...</option>';
      
      try {
        // Usamos el End Point que habiamos creado, donde nos proporciona las habitaciones libres para esa Ala
        const response = await fetch(`/habitaciones/por-ala?alaId=${alaId}&pacienteId=${pacienteId}`);
        const habitaciones = await response.json();

        // Limpiamos el select para llenarlo con los datos nuevos
        selectHabitacion.innerHTML = '<option disabled selected value="">-- Seleccione Habitación --</option>';
        
        if(habitaciones.length > 0) {
            habitaciones.forEach(h => {
                const option = document.createElement("option");
                option.value = h.id_habitacion;
                option.textContent = `Habitación ${h.numero} (Cap: ${h.capacidad})`;
                selectHabitacion.appendChild(option);
            });
            selectHabitacion.disabled = false;
        } else {
            selectHabitacion.innerHTML = '<option disabled selected value="">No hay habitaciones disponibles</option>';
        }

      } catch (error) {
        console.error("Error cargando habitaciones:", error);
        selectHabitacion.innerHTML = '<option disabled selected value="">Error al cargar</option>';
      }
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modalIdentificar) modalIdentificar.classList.add("hidden");
    if (e.target === modalCambio) modalCambio.classList.add("hidden");
  });
});