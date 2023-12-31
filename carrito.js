// Verificacion de la edad del cliente (SweetAlert)

document.addEventListener('DOMContentLoaded', function () {
   
    // Pregunta la edad al usuario: nombre de quien retira, documento de quien retira, metodo de pago
   
    Swal.fire({
        title: 'Ingresa tu edad:',
        input: 'number',
        inputAttributes: {
            min: 1,
            step: 1
        },
        showCancelButton: false,
        confirmButtonText: 'Verificar',
       
    }).then((result) => {
        if (result.isConfirmed) {
            const edad = result.value;

            // Verificamos edad ingresada para ver si el usuario: nombre de quien retira, documento de quien retira, metodo de pago cumple con el requisito de ser mayor a 18 anos y menor a 65
            if (edad >= 18 && edad <= 65) {
                Swal.fire({
                    title: 'Bienvenido a PELETEIRO SHOP',
                    text: 'Acceso permitido.',
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Acceso denegado',
                    text: 'Debes tener entre 18 y 65 años para acceder.',
                    icon: 'error'
                }).then(() => {
                    
                    // Redirige a google cuando el acceso es denegado.
                   
                    window.location.href = 'https://google.com'; 
                });
            }
        }
    });
});

//Nota de descuento (Toastify)

Toastify({

    text: "NOTA: Si lleva más de 5 productos iguales, tendrá un descuento del 20%",
    
    duration: -1,
    close: true,
    background: "linear-gradient(to left, #00b09b, #96c93d)",
    }).showToast();


//Nota acerca de la compra de fruta (Toastify)

Toastify({

    text: "Al comprar fruta, la cantidad se mide en kilogramos",
    
    duration: 5000,
    close: true,
    background: "linear-gradient(to left, #00b09b, #96c93d)",
    }).showToast();

// Array para almacenar los productos en el carrito

const carrito = [];


const nombreProductoInput = document.getElementById('nombreProducto');
const precioProductoInput = document.getElementById('precioProducto');
const cantidadProductoInput = document.getElementById('cantidadProducto');
const agregarProductoBtn = document.getElementById('agregarProductoBtn');
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');

// Funcion que devuelve una promesa para validar el producto
function validarProducto(nombre, precio, cantidad) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cantidad > 0) {
                resolve(); // Si la cantidad es mayor a 0, el producto es valido
            } else {
                reject('El producto no es válido, verifique la cantidad de productos deseados'); // En caso de no ser valido se ve este mensaje
            }
        }, 1000); // Tiempo de espera de 1 segundo simulando verificacion
    });
}

// Evento al hacer clic en el boton "Agregar al Carrito"
agregarProductoBtn.addEventListener('click', () => {
    const nombreProducto = nombreProductoInput.value.trim(); // Obtener el nombre del producto y quitar espacios en blanco
    const precioProducto = parseFloat(precioProductoInput.value);
    const cantidadProducto = parseInt(cantidadProductoInput.value);

    // Verificar si la casilla de nombre esta vacia
    if (nombreProducto === '') {
        Swal.fire("Por favor, ingrese el nombre del producto");
        return;
    }

    if (isNaN(precioProducto) || isNaN(cantidadProducto)) {
        Swal.fire("Por favor, ingrese SOLAMENTE valores numéricos");
        return;
    }

    // Se valida el producto antes de agregarlo al carrito
    validarProducto(nombreProducto, precioProducto, cantidadProducto)
        .then(() => {
            // Producto valido: se agrega al carrito    
            agregarProducto(nombreProducto, precioProducto, cantidadProducto);
            Swal.fire("Producto agregado al carrito con éxito");
        })
        .catch((error) => {
            // Producto no valido: se muestra un mensaje de error
            Swal.fire("Error al agregar el producto al carrito: " + error);
        });
});

//FUNCIONES

// Funcion para agregar un producto al carrito
function agregarProducto(nombre, precio, cantidad) {
    carrito.push({ nombre, precio, cantidad });
    actualizarCarritoEnDOM();
}

// Funcion para calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

// Funcion para aplicar descuento de 20% al llevar 5 productos o mas
function aplicarDescuento(total, cantidadTotal) {
    if (cantidadTotal >= 5) {
        return total * 0.8;
    }
    return total;
}

// Función para actualizar el carrito en el DOM
function actualizarCarritoEnDOM() {
    // Limpiar el contenido actual del carrito en el DOM
    listaCarrito.innerHTML = '';

    // Actualizar la lista del carrito en el DOM con los productos actuales
    carrito.forEach(producto => {
        const nuevoProducto = document.createElement('li');
        nuevoProducto.textContent = `${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad}`;
        listaCarrito.appendChild(nuevoProducto);
    });

    function calcularCantidadTotalProductos() {
        return carrito.reduce((total, producto) => total + producto.cantidad, 0);
    }

    // Calcular el total y aplicar descuento si es necesario
    const total = calcularTotal();
    const totalConDescuento = aplicarDescuento(total, calcularCantidadTotalProductos());
    
    // Actualizar el total en el DOM
    totalElement.textContent = `Total: $${totalConDescuento.toFixed(2)}`;
}
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
      }
      
      // Funcion para agregar un producto al carrito
      function agregarAlCarrito(producto) {
        // Obtener el carrito actual desde el almacenamiento local
        let carrito = obtenerCarrito();
      
        // Agregar el nuevo producto al carrito
        carrito.push(producto);
      
        // Actualizar el almacenamiento local con el carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));
      
        console.log('Producto agregado al carrito:', producto);}



        ///Limpiar carrito 

        const limpiarCarritoBtn = document.getElementById('limpiarCarritoBtn');

        // Evento al hacer clic en el boton "Limpiar Carrito" y confirmacion con Sweet Alert
        limpiarCarritoBtn.addEventListener('click', () => {
            Swal.fire({
                title: "¿Estás seguro de que deseas limpiar el contenido del carrito?",
                text: "No podrás revertir esta acción",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#008000",
                cancelButtonColor: "#d33",
                confirmButtonText: "Limpiar de todos modos",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                // Verificar si el usuario: nombre de quien retira, documento de quien retira, metodo de pago confirmo la accion
                if (result.isConfirmed) {
                    // Si el usuario: nombre de quien retira, documento de quien retira, metodo de pago confirmo la accion se limpia el contenido del carrito
                    carrito.length = 0;
        
                    // Luego, se muestra un mensaje de exito
                    Swal.fire({
                        title: "Acción realizada con éxito",
                        text: "El contenido del carrito fue borrado con éxito",
                        icon: "success"
                    });
        
                    // Actualizar el carrito en el DOM
                    actualizarCarritoEnDOM();
                }
            });
        });

    
        document.addEventListener('DOMContentLoaded', function () {
            // Obtener los nombres y precios de los productos desde el archivo JSON
            fetch('productos.json')
                .then(response => response.json())
                .then(data => {
                    const productos = data;
        
                    // Configurar Awesomplete en las entradas de nombre precio y cantidad
                    const nombreProductoInput = document.getElementById('nombreProducto');
                    const precioProductoInput = document.getElementById('precioProducto');
        
                    const awesomplete = new Awesomplete(nombreProductoInput, {
                        list: productos.map(producto => producto.nombre),
                        minChars: 1, 
                        autoFirst: true, 
                        item: function (text, input) {
                           
                            const item = Awesomplete.$.create('li', {
                                innerHTML: text,
                                style: 'color: #FFFFFF; background-color: #3498db;' 
                            });
                            return item;
                        },
                    });
        
                    // Evento al seleccionar un elemento de la lista
                    nombreProductoInput.addEventListener('awesomplete-select', function (event) {
                        const productoSeleccionado = productos.find(producto => producto.nombre === event.text.value);
        
                        // Verificar si el producto seleccionado esta en la lista
                        if (productoSeleccionado) {
                            // Llenar la casilla de precio con el precio del producto seleccionado
                            precioProductoInput.value = productoSeleccionado.precio;
        
                            // Deshabilitar la edicion del campo de precio
                            precioProductoInput.disabled = true;
                        }
                    });
        
                    // Evento al salir del campo de nombre
                    nombreProductoInput.addEventListener('blur', function () {
                        const productoIngresado = nombreProductoInput.value;
                        const productoEnLista = productos.find(producto => producto.nombre === productoIngresado);
        
                        // Verificar si el producto ingresado manualmente esta en la lista
                        if (!productoEnLista) {
                            // Limpiar el campo de precio y permitir la edición
                            precioProductoInput.value = '';
                            precioProductoInput.disabled = false;
        
                            // Limpiar el campo de nombre
                            nombreProductoInput.value = '';
                        }
                    });
                })
                .catch(error => console.error('Error al cargar productos desde el archivo JSON:', error));
        });

        const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');

        finalizarCompraBtn.addEventListener('click', () => {
            // Verificar si el carrito está vacío y si es asi avisar al usuario: nombre de quien retira, documento de quien retira, metodo de pago
            if (carrito.length === 0) {
                Swal.fire('Carrito vacío', 'Agrega productos al carrito antes de finalizar la compra', 'warning');
                return;
            }
        
            // Mostrar cuadro de checkout usando Sweet Alert
            Swal.fire({
                title: 'Finalizar Compra',
                html: `
                    <form id="formularioCheckout">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" required>
                        <br>
                        <label for="apellido">Apellido:</label>
                        <input type="text" id="apellido" required>
                        <br>
                        <br>
                        <label for="email">Correo Electrónico: (OPCIONAL)</label>
                        <input type="email" id="email" required>
                        <br>
                        <label for="personaRetira">Persona que retirará el pedido: (OPCIONAL)</label>
                        <input type="text" id="personaRetira" required>
                        <br>
                        <label for="documentoPersonaQueRetira">Documento de la persona que retirará el pedido:(OPCIONAL)</label>
                        <input type="text" id="documentoPersonaQueRetira" required>
                        <br>
                        <label for="metodoPago">Método de Pago:</label>
                        <select id="metodoPago">
                            <option value="efectivo">Pago en efectivo</option>
                            <option value="tarjeta">Tarjeta de crédito</option>
                            <option value="tarjeta">Tarjeta de débito</option>
                        </select>
                    </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Confirmar Compra',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    // Obtener valores de los campos del formulario
                    const nombre = document.getElementById('nombre').value.trim();
                    const apellido = document.getElementById('apellido').value.trim();
        
                    // Validar que los campos de nombre y apellido estén completos
                    if (!nombre || !apellido) {
                        Swal.fire('Error', 'Por favor, complete los campos de nombre y apellido', 'error');
                        return; // Se detiene el proceso si los campos de nombre y apellido no estan completos
                    }
        
                   // Informacion adicional brindada por el usuario: nombre de quien retira, documento de quien retira, metodo de pago
                    const personaRetira = document.getElementById('personaRetira').value;
                    const documentoPersonaQueRetira = document.getElementById('documentoPersonaQueRetira').value;
                    const metodoPago = document.getElementById('metodoPago').value;
        
                    // Mensaje de exito
                    Swal.fire('¡Compra realizada con éxito!', `Gracias, ${nombre} ${apellido}, te esperamos en nuestras sucursales!`,'success');
        
                    // Limpiar el carrito después de confirmar la compra
                    carrito.length = 0;
        
                    // Actualizar el carrito en el DOM para reflejar el cambio
                    actualizarCarritoEnDOM();
                }
            });
        });
     