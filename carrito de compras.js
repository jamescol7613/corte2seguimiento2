// Clase para representar un Producto
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

// Clase para representar el Carrito de Compras
class Carrito {
    constructor() {
        this.productos = []; // Array para almacenar los productos en el carrito
    }

    // Método para agregar un producto al carrito
    agregarProducto(producto, cantidad) {
        if (cantidad > producto.stock) {
            alert(`No hay suficiente stock para ${producto.nombre}.`);
            return;
        }

        // Verificar si el producto ya está en el carrito
        const productoEnCarrito = this.productos.find(p => p.producto.nombre === producto.nombre);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad; // Incrementar cantidad
        } else {
            this.productos.push({ producto, cantidad }); // Agregar nuevo producto al carrito
        }

        // Actualizar stock del producto
        producto.stock -= cantidad;
        alert(`Agregado ${cantidad} de ${producto.nombre} al carrito.`);
    }

    // Método para mostrar los productos en el carrito
    mostrarCarrito() {
        if (this.productos.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        let mensaje = "Productos en el carrito:\n";
        this.productos.forEach(item => {
            const subtotal = item.producto.precio * item.cantidad;
            mensaje += `${item.cantidad} x ${item.producto.nombre} a $${item.producto.precio} (Subtotal: $${subtotal.toFixed(2)})\n`;
        });
        alert(mensaje);
    }

    // Método para calcular el total de la compra
    calcularTotal() {
        let total = 0;
        this.productos.forEach(item => {
            total += item.producto.precio * item.cantidad;
        });
        return total;
    }
}

// Función para interactuar con el cliente
function iniciarCarrito() {
    // Crear productos simulados
    const productosDisponibles = [
        new Producto("Manzanas", 1.5, 50),
        new Producto("Naranjas", 2, 30),
        new Producto("Plátanos", 0.75, 20)
    ];

    // Crear un nuevo carrito de compras
    const carrito = new Carrito();

    let continuar = true;

    while (continuar) {
        const opciones = `
        Elija una opción:
        1. Agregar producto al carrito
        2. Mostrar carrito
        3. Calcular total
        4. Salir
        `;
        const eleccion = prompt(opciones);

        switch (eleccion) {
            case "1":
                // Mostrar productos disponibles
                let listaProductos = "Seleccione un producto:\n";
                productosDisponibles.forEach((p, i) => {
                    listaProductos += `${i + 1}. ${p.nombre} - $${p.precio} (Stock: ${p.stock})\n`;
                });
                const productoSeleccionado = parseInt(prompt(listaProductos)) - 1;
                if (productoSeleccionado < 0 || productoSeleccionado >= productosDisponibles.length) {
                    alert("Opción no válida.");
                    break;
                }

                // Solicitar cantidad
                const cantidad = parseInt(prompt(`Ingrese la cantidad de ${productosDisponibles[productoSeleccionado].nombre} a agregar:`));
                if (isNaN(cantidad) || cantidad <= 0) {
                    alert("Cantidad no válida.");
                    break;
                }

                // Agregar producto al carrito
                carrito.agregarProducto(productosDisponibles[productoSeleccionado], cantidad);
                break;

            case "2":
                // Mostrar productos en el carrito
                carrito.mostrarCarrito();
                break;

            case "3":
                // Calcular y mostrar total
                const total = carrito.calcularTotal();
                alert(`Total de la compra: $${total.toFixed(2)}`);
                break;

            case "4":
                // Salir del bucle
                continuar = false;
                alert("Gracias por su compra.");
                break;

            default:
                alert("Opción no válida.");
                break;
        }
    }
}

// Iniciar interacción
iniciarCarrito();
