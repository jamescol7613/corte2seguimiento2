// Clase para representar una Cita
class Cita {
    constructor(nombrePaciente, fecha, hora, medico) {
        this.nombrePaciente = nombrePaciente;
        this.fecha = new Date(fecha + ' ' + hora); // Combina fecha y hora en un objeto Date
        this.medico = medico;
    }
}

// Clase para gestionar el sistema de citas
class SistemaCitas {
    constructor() {
        this.citas = []; // Array para almacenar las citas programadas
    }

    // Método para programar una nueva cita
    programarCita(nombrePaciente, fecha, hora, medico) {
        const nuevaCita = new Cita(nombrePaciente, fecha, hora, medico);
        this.citas.push(nuevaCita);
        alert(`Cita programada para ${nombrePaciente} con ${medico} el ${fecha} a las ${hora}.`);
    }

    // Método para ver todas las citas programadas
    verCitas() {
        if (this.citas.length === 0) {
            alert("No hay citas programadas.");
            return;
        }

        // Ordenar las citas por fecha y hora
        const citasOrdenadas = this.citas.sort((a, b) => a.fecha - b.fecha);
        let mensaje = "Citas programadas:\n";
        citasOrdenadas.forEach((cita, index) => {
            mensaje += `${index + 1}. ${cita.nombrePaciente} - ${cita.medico} - ${cita.fecha.toLocaleString()}\n`;
        });
        alert(mensaje);
    }

    // Método para cancelar una cita
    cancelarCita(indice) {
        if (indice < 1 || indice > this.citas.length) {
            alert("Índice de cita no válido.");
            return;
        }
        const citaCancelada = this.citas.splice(indice - 1, 1); // Elimina la cita del array
        alert(`Cita de ${citaCancelada[0].nombrePaciente} cancelada.`);
    }
}

// Crear una instancia del sistema de citas
const sistemaCitas = new SistemaCitas();

// Función para mostrar el menú de interacción
function mostrarMenu() {
    let salir = false;

    while (!salir) {
        const opcion = prompt(
            "Selecciona una opción:\n" +
            "1. Programar Cita\n" +
            "2. Ver Citas Programadas\n" +
            "3. Cancelar Cita\n" +
            "4. Salir"
        );

        switch (opcion) {
            case "1":
                programarCita();
                break;
            case "2":
                sistemaCitas.verCitas();
                break;
            case "3":
                cancelarCita();
                break;
            case "4":
                salir = true;
                alert("Gracias por usar el sistema de gestión de citas médicas.");
                break;
            default:
                alert("Opción no válida, intenta de nuevo.");
                break;
        }
    }
}

// Función para programar una cita
function programarCita() {
    const nombrePaciente = prompt("Ingrese el nombre del paciente:");
    const fecha = prompt("Ingrese la fecha de la cita (YYYY-MM-DD):");
    const hora = prompt("Ingrese la hora de la cita (HH:MM):");
    const medico = prompt("Ingrese el nombre del médico:");

    sistemaCitas.programarCita(nombrePaciente, fecha, hora, medico);
}

// Función para cancelar una cita
function cancelarCita() {
    const indice = parseInt(prompt("Ingrese el número de la cita a cancelar:"));
    sistemaCitas.cancelarCita(indice);
}

// Iniciar la aplicación
mostrarMenu();
