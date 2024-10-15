// Datos simulados del banco: clientes, pines y cuentas
const banco = {
    clientes: [
      {
        documento: "123456789",
        pin: "1234",
        intentos: 0,
        cuentas: [
          { tipo: "Ahorros", saldo: 1000000 },
          { tipo: "Corriente", saldo: 500000 }
        ]
      },
      {
        documento: "987654321",
        pin: "4321",
        intentos: 0,
        cuentas: [
          { tipo: "Ahorros", saldo: 2000000 },
          { tipo: "Corriente", saldo: 1000000 }
        ]
      }
    ]
  };
  
  // Función para validar PIN
  function validarPin(documento, pin) {
    let cliente = banco.clientes.find(c => c.documento === documento);
    if (!cliente) {
      console.log("Cliente no encontrado.");
      return null;
    }
    
    if (cliente.intentos >= 3) {
      console.log("Cuenta bloqueada por demasiados intentos fallidos.");
      return null;
    }
    
    if (cliente.pin === pin) {
      cliente.intentos = 0; // Resetear intentos si el pin es correcto
      return cliente;
    } else {
      cliente.intentos++;
      console.log(`PIN incorrecto. Intentos restantes: ${3 - cliente.intentos}`);
      if (cliente.intentos >= 3) {
        console.log("Has excedido el número máximo de intentos.");
        return null;
      }
      return false;
    }
  }
  
  // Función para realizar una consulta de saldo
  function consultarSaldo(cliente) {
    console.log("Consulta de saldo:");
    cliente.cuentas.forEach((cuenta, index) => {
      console.log(`${index + 1}. Cuenta ${cuenta.tipo}: $${cuenta.saldo}`);
    });
  }
  
  // Función para realizar un retiro (sin restricción de múltiplos)
  function retirarDinero(cliente, indiceCuenta, monto) {
    let cuenta = cliente.cuentas[indiceCuenta - 1];
    if (!cuenta) {
      console.log("Tipo de cuenta no válido.");
      return;
    }
  
    if (cuenta.saldo >= monto) {
      cuenta.saldo -= monto;
      console.log(`Retiro exitoso. Puede tomar $${monto} de la bandeja.`);
    } else {
      console.log("Fondos insuficientes.");
    }
  }
  
  // Función para realizar un depósito
  function depositarDinero(cliente, indiceCuenta, monto, tipoDeposito) {
    let cuenta = cliente.cuentas[indiceCuenta - 1];
    if (!cuenta) {
      console.log("Tipo de cuenta no válido.");
      return;
    }
  
    cuenta.saldo += monto;
    console.log(`Depósito exitoso de $${monto} en ${tipoDeposito}.`);
  }
  
  // Función para realizar una transferencia
  function transferirDinero(cliente, indiceCuentaOrigen, indiceCuentaDestino, monto) {
    let cuentaOrigen = cliente.cuentas[indiceCuentaOrigen - 1];
    let cuentaDestino = cliente.cuentas[indiceCuentaDestino - 1];
  
    if (!cuentaOrigen || !cuentaDestino) {
      console.log("Tipos de cuenta no válidos.");
      return;
    }
  
    if (cuentaOrigen.saldo >= monto) {
      cuentaOrigen.saldo -= monto;
      cuentaDestino.saldo += monto;
      console.log(`Transferencia exitosa de $${monto} de cuenta ${cuentaOrigen.tipo} a cuenta ${cuentaDestino.tipo}.`);
    } else {
      console.log("Fondos insuficientes en la cuenta origen.");
    }
  }
  
  // Función para iniciar sesión en el cajero automático
  function iniciarCajero() {
    let documento = prompt("Ingrese su documento de identidad:");
    let cliente = null;
    let intentos = 0;
  
    while (!cliente && intentos < 3) {
      let pin = prompt("Ingrese su PIN:");
      cliente = validarPin(documento, pin);
      if (!cliente) {
        intentos++;
        if (intentos >= 3) {
          console.log("Has excedido el número máximo de intentos. Adiós.");
          return;
        }
      } else if (cliente === false) {
        console.log("Intento fallido. Intente de nuevo.");
      }
    }
  
    if (cliente) {
      mostrarMenu(cliente);
    }
  }
  
  // Función para mostrar el menú de transacciones
  function mostrarMenu(cliente) {
    let salir = false;
    while (!salir) {
      let opcion = prompt(
        "Elija una opción:\n1. Consultar saldo\n2. Retirar dinero\n3. Depositar dinero\n4. Transferir dinero\n5. Salir"
      );
  
      switch (opcion) {
        case "1":
          consultarSaldo(cliente);
          break;
        case "2":
          let tipoCuentaRetiro = prompt("Seleccione la cuenta para retirar:\n1. Ahorros\n2. Corriente");
          let montoRetiro = parseFloat(prompt("Ingrese el monto a retirar:"));
          retirarDinero(cliente, tipoCuentaRetiro, montoRetiro);
          break;
        case "3":
          let tipoCuentaDep = prompt("Seleccione la cuenta para depositar:\n1. Ahorros\n2. Corriente");
          let montoDep = parseFloat(prompt("Ingrese el monto a depositar:"));
          let tipoDeposito = prompt("Seleccione el tipo de depósito:\n1. Efectivo\n2. Cheque") === "1" ? "efectivo" : "cheque";
          depositarDinero(cliente, tipoCuentaDep, montoDep, tipoDeposito);
          break;
        case "4":
          let cuentaOrigen = prompt("Seleccione la cuenta origen para la transferencia:\n1. Ahorros\n2. Corriente");
          let cuentaDestino = prompt("Seleccione la cuenta destino:\n1. Ahorros\n2. Corriente");
          let montoTrans = parseFloat(prompt("Ingrese el monto a transferir:"));
          transferirDinero(cliente, cuentaOrigen, cuentaDestino, montoTrans);
          break;
        case "5":
          salir = true;
          console.log("Gracias por usar el cajero automático.");
          break;
        default:
          console.log("Opción no válida.");
          break;
      }
    }
  }
  
  // Iniciar la simulación del cajero automático
  iniciarCajero();