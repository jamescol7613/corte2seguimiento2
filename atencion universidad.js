// Objeto que almacena las estadísticas de atención
const estadisticasAtencion = {
    totalAtendidos: 0,
    porTipo: {
      llamada: 0,
      asesorEstudiante: 0,
      asesorDirectivo: 0
    }
  };
  
  // Lista para almacenar las atenciones registradas
  const atenciones = [];
  
  // Función para registrar una nueva atención
  function registrarAtencion(cedula, tipoAtencion) {
    const nuevaAtencion = { cedula, tipoAtencion };
    atenciones.push(nuevaAtencion);
    estadisticasAtencion.totalAtendidos++;
  
    if (tipoAtencion === "llamada") {
      estadisticasAtencion.porTipo.llamada++;
    } else if (tipoAtencion === "asesorEstudiante") {
      estadisticasAtencion.porTipo.asesorEstudiante++;
    } else if (tipoAtencion === "asesorDirectivo") {
      estadisticasAtencion.porTipo.asesorDirectivo++;
    }
  
    console.log(`Atención registrada: ${cedula}, tipo: ${tipoAtencion}`);
  }
  
  // Función para transferir atención a llamada telefónica
  function transferirALlamada(cedula) {
    const atencion = atenciones.find(atencion => atencion.cedula === cedula);
  
    if (atencion && atencion.tipoAtencion !== "llamada") {
      // Ajustar las estadísticas antes de la transferencia
      if (atencion.tipoAtencion === "asesorEstudiante") {
        estadisticasAtencion.porTipo.asesorEstudiante--;
      } else if (atencion.tipoAtencion === "asesorDirectivo") {
        estadisticasAtencion.porTipo.asesorDirectivo--;
      }
  
      // Cambiar el tipo de atención
      atencion.tipoAtencion = "llamada";
      estadisticasAtencion.porTipo.llamada++;
  
      console.log(`Atención de ${cedula} transferida a llamada telefónica.`);
    } else {
      console.log("Atención no encontrada o ya es de tipo llamada.");
    }
  }
  
  // Función para mostrar las estadísticas
  function mostrarEstadisticas() {
    console.log("Estadísticas de atención:");
    console.log(`Total de usuarios atendidos: ${estadisticasAtencion.totalAtendidos}`);
    console.log(`Atenciones por llamada telefónica: ${estadisticasAtencion.porTipo.llamada}`);
    console.log(`Atenciones por asesoría a estudiantes: ${estadisticasAtencion.porTipo.asesorEstudiante}`);
    console.log(`Atenciones por asesoría a directivos: ${estadisticasAtencion.porTipo.asesorDirectivo}`);
  }
  
  // Función para iniciar el sistema de atención
  function iniciarAtencion() {
    let salir = false;
  
    while (!salir) {
      let cedula = prompt("Ingrese su número de cédula:");
      let tipoAtencion = prompt(
        "Seleccione el tipo de atención:\n1. Llamada telefónica\n2. Asesoría Estudiante\n3. Asesoría Directivo"
      );
  
      switch (tipoAtencion) {
        case "1":
          registrarAtencion(cedula, "llamada");
          break;
        case "2":
          registrarAtencion(cedula, "asesorEstudiante");
          break;
        case "3":
          registrarAtencion(cedula, "asesorDirectivo");
          break;
        default:
          console.log("Opción no válida.");
          continue;
      }
  
      let transferir = prompt("¿Desea transferir la atención a llamada telefónica? (1. Sí, 2. No)") === "1";
      if (transferir) {
        transferirALlamada(cedula);
      }
  
      let continuar = prompt("¿Desea registrar otra atención? (1. Sí, 2. No)") === "2";
      if (continuar) {
        salir = true;
      }
    }
  
    mostrarEstadisticas();
    console.log("Gracias por usar el sistema de atención de la universidad.");
  }
  
  // Iniciar la simulación del sistema de atención
  iniciarAtencion()