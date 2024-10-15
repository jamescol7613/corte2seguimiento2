// Clase para representar un Turno
class Turno {
    constructor(numero) {
        this.numero = numero;
    }
}

// Clase para gestionar la Cola de Turnos
class SistemaTurnos {
    constructor() {
        this.cola = []; // Array para almacenar los turnos
        this.contadorTurnos = 0; // Contador de turnos
    }

    // Método para tomar un turno
    tomarTurno() {
        this.contadorTurnos++; // Incrementar el contador de turnos
        const nuevoTurno = new Turno(this.contadorTurnos); // Crear un nuevo turno
        this.cola.push(nuevoTurno); // Agregar el turno a la cola
        console.log(`Turno tomado: ${nuevoTurno.numero}`);
    }

    // Método para llamar al siguiente cliente
    llamarCliente() {
        if (this.cola.length === 0) {
            console.log("No hay clientes en la cola de espera.");
            return;
        }
        const turnoLlamado = this.cola.shift(); // Eliminar el primer turno de la cola
        console.log(`Llamando al cliente con turno: ${turnoLlamado.numero}`);
    }

    // Método para mostrar la cola de espera
    mostrarCola() {
        if (this.cola.length === 0) {
            console.log("La cola de espera está vacía.");
            return;
        }
        console.log("Cola de espera actual:");
        this.cola.forEach(turno => {
            console.log(`Turno: ${turno.numero}`);
        });
    }

    // Método para mostrar el contador de turnos
    mostrarContadorTurnos() {
        console.log(`Total de turnos tomados: ${this.contadorTurnos}`);
    }
}

// Ejemplo de uso del sistema
const sistemaTurnos = new SistemaTurnos();

// Tomar turnos
sistemaTurnos.tomarTurno(); // Turno 1
sistemaTurnos.tomarTurno(); // Turno 2
sistemaTurnos.tomarTurno(); // Turno 3

// Mostrar la cola de espera
sistemaTurnos.mostrarCola();

// Llamar a un cliente
sistemaTurnos.llamarCliente(); // Llama al cliente con Turno 1

// Mostrar la cola de espera nuevamente
sistemaTurnos.mostrarCola();

// Mostrar el contador de turnos
sistemaTurnos.mostrarContadorTurnos(); // Muestra cuántos turnos se han tomado
