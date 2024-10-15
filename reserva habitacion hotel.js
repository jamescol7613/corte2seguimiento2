// Datos del hotel: habitaciones disponibles y sus características
const hotel = {
  habitaciones: {
    individual: { total: 5, ocupadas: 0, maxPersonas: 2, fumador: false, mascotas: false },
    doble: { total: 5, ocupadas: 0, maxPersonas: 4, fumador: false, mascotas: false },
    familiar: { total: 3, ocupadas: 0, maxPersonas: 6, fumador: false, mascotas: true }
  },
  reservas: []
};

// Función para verificar disponibilidad de una habitación
function verificarDisponibilidad(tipoHabitacion, numeroPersonas, fumador, conMascota) {
  const habitacion = hotel.habitaciones[tipoHabitacion];

  if (!habitacion) {
    console.log("Tipo de habitación no disponible.");
    return false;
  }

  if (habitacion.ocupadas >= habitacion.total) {
    console.log("No hay habitaciones disponibles para el tipo seleccionado.");
    return false;
  }

  if (numeroPersonas > habitacion.maxPersonas) {
    console.log(`Número de personas excede la capacidad de la habitación (${habitacion.maxPersonas} personas máximo).`);
    return false;
  }

  if (tipoHabitacion !== "familiar" && conMascota) {
    console.log("Solo se permiten mascotas en habitaciones familiares.");
    return false;
  }

  if (!habitacion.fumador && fumador) {
    console.log("Las habitaciones seleccionadas no permiten fumar.");
    return false;
  }

  return true;
}

// Función para realizar una reserva
function realizarReserva(nombre, pais, tipoHabitacion, numeroPersonas, periodoEstadia, fumador, conMascota) {
  if (verificarDisponibilidad(tipoHabitacion, numeroPersonas, fumador, conMascota)) {
    hotel.habitaciones[tipoHabitacion].ocupadas++;
    const nuevaReserva = {
      nombre,
      pais,
      tipoHabitacion,
      numeroPersonas,
      periodoEstadia,
      fumador,
      conMascota
    };
    hotel.reservas.push(nuevaReserva);
    console.log("Reserva realizada con éxito.");
  } else {
    console.log("No se pudo realizar la reserva.");
  }
}

// Función para mostrar las habitaciones ocupadas
function habitacionesOcupadas() {
  let totalOcupadas = 0;
  Object.keys(hotel.habitaciones).forEach(tipo => {
    totalOcupadas += hotel.habitaciones[tipo].ocupadas;
  });
  console.log(`El hotel tiene ${totalOcupadas} habitaciones reservadas.`);
}

// Función para iniciar la reserva
function iniciarReserva() {
  let salir = false;

  while (!salir) {
    let nombre = prompt("Ingrese su nombre:");
    let pais = prompt("Ingrese su país de origen:");
    let tipoHabitacion = prompt("Seleccione el tipo de habitación:\n1. Individual\n2. Doble\n3. Familiar");
    let numeroPersonas = parseInt(prompt("Ingrese el número de personas:"));
    let periodoEstadia = prompt("Ingrese el periodo de la estadía (Ej: 2024-10-15 a 2024-10-20):");
    let fumador = prompt("¿Desea una habitación para fumadores? (1. Sí, 2. No)") === "1";
    let conMascota = prompt("¿Traerá mascota? (1. Sí, 2. No)") === "1";

    switch (tipoHabitacion) {
      case "1":
        realizarReserva(nombre, pais, "individual", numeroPersonas, periodoEstadia, fumador, conMascota);
        break;
      case "2":
        realizarReserva(nombre, pais, "doble", numeroPersonas, periodoEstadia, fumador, conMascota);
        break;
      case "3":
        realizarReserva(nombre, pais, "familiar", numeroPersonas, periodoEstadia, fumador, conMascota);
        break;
      default:
        console.log("Opción no válida. Intente nuevamente.");
        continue;
    }

    let continuar = prompt("¿Desea realizar otra reserva? (1. Sí, 2. No)") === "2";
    if (continuar) {
      salir = true;
    }
  }

  habitacionesOcupadas();
  console.log("Gracias por usar nuestro servicio de reservas.");
}

// Iniciar la simulación del sistema de reservas del hotel
iniciarReserva();


