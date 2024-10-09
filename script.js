var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Encabezado ------------------------------------------------------------------------------------------------------------------------------------------------------------------
var EncabezadoPagina = /** @class */ (function () {
    function EncabezadoPagina(titulo) {
        if (titulo === void 0) { titulo = "Título por defecto"; }
        this.headerElement = null;
        this.titulo = titulo;
        this.color = "white";
        this.fuente = "Arial";
        this.alineacion = "left"; // Alineación por defecto
    }
    EncabezadoPagina.prototype.obtenerPropiedades = function () {
        return {
            titulo: this.titulo,
            color: this.color,
            fuente: this.fuente,
            alineacion: this.alineacion
        };
    };
    EncabezadoPagina.prototype.establecerAlineacion = function (alineacion) {
        var opcionesValidas = ["center", "right", "left"];
        if (opcionesValidas.indexOf(alineacion) !== -1) {
            this.alineacion = alineacion;
        }
        else {
            console.error("Alineaci\u00F3n no v\u00E1lida. Debe ser una de las siguientes: ".concat(opcionesValidas.join(", ")));
        }
    };
    EncabezadoPagina.prototype.establecerFuente = function (fuente) {
        var opcionesValidas = ["Courier New", "Helvética", "Verdana"];
        if (opcionesValidas.indexOf(fuente) !== -1) {
            this.fuente = fuente;
        }
        else {
            console.error("Fuente no v\u00E1lida. Debe ser una de las siguientes: ".concat(opcionesValidas.join(", ")));
        }
    };
    EncabezadoPagina.prototype.aplicarEstilos = function (container) {
        // Limpiar contenido anterior
        container.innerHTML = "";
        // Crear el nuevo título
        var headerElement = document.createElement('h1');
        headerElement.textContent = this.titulo;
        headerElement.style.color = this.color;
        headerElement.style.fontFamily = this.fuente;
        headerElement.style.textAlign = this.alineacion;
        // Añadir el título al contenedor de previsualización
        container.appendChild(headerElement);
    };
    EncabezadoPagina.prototype.eliminarTitulo = function () {
        if (this.headerElement) {
            this.headerElement.remove();
            this.headerElement = null; // Reset element to prevent errors
        }
    };
    EncabezadoPagina.prototype.imprimirPropiedades = function () {
        var propiedades = this.obtenerPropiedades();
        console.log("T\u00EDtulo: ".concat(propiedades.titulo));
        console.log("Color: ".concat(propiedades.color));
        console.log("Fuente: ".concat(propiedades.fuente));
        console.log("Alineaci\u00F3n: ".concat(propiedades.alineacion));
    };
    return EncabezadoPagina;
}());
// Instanciar la clase
var encabezado = new EncabezadoPagina();
// Obtener referencias a los elementos del DOM
var tituloInput = document.getElementById('titulo');
var fuenteSelect = document.getElementById('fuente');
var alineacionSelect = document.getElementById('alineacion');
var applyBtn = document.getElementById('apply-btn');
var printBtn = document.getElementById('print-btn');
var titlePreview = document.getElementById('title-preview');
// Función para aplicar el título y alineación
applyBtn === null || applyBtn === void 0 ? void 0 : applyBtn.addEventListener('click', function () {
    var titulo = tituloInput.value;
    var alineacion = alineacionSelect.value;
    var fuente = fuenteSelect.value;
    if (titulo) {
        encabezado.titulo = titulo; // Establecer el nuevo título
    }
    encabezado.establecerAlineacion(alineacion); // Establecer la alineación
    encabezado.establecerFuente(fuente);
    encabezado.aplicarEstilos(titlePreview); // Aplicar el estilo y mostrar el título
});
// Función para imprimir las propiedades en la consola
printBtn === null || printBtn === void 0 ? void 0 : printBtn.addEventListener('click', function () {
    encabezado.imprimirPropiedades(); // Imprimir propiedades en la consola
});
//Clase calculadora-----------------------------------------------------------------------------------------------------------------------------------------------------------
var Calculadora = /** @class */ (function () {
    function Calculadora() {
    }
    Calculadora.prototype.sumar = function (a, b) {
        return a + b;
    };
    Calculadora.prototype.restar = function (a, b) {
        return a - b;
    };
    Calculadora.prototype.multiplicar = function (a, b) {
        return a * b;
    };
    Calculadora.prototype.dividir = function (a, b) {
        if (b === 0) {
            return "Error: División por cero";
        }
        return a / b;
    };
    Calculadora.prototype.potencia = function (base, exponente) {
        return Math.pow(base, exponente);
    };
    Calculadora.prototype.factorial = function (n) {
        if (n < 0) {
            return "Error: Factorial no definido para números negativos";
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        var resultado = 1;
        for (var i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    };
    return Calculadora;
}());
// Variables globales
var calculadora = new Calculadora();
var operacionActual = '';
var numeroActual = '';
var primerNumero = null;
// Función para añadir número al input
function addNumber(num) {
    numeroActual += num.toString(); // Convertir el número a string y concatenarlo
    document.getElementById('resultado').value = numeroActual;
    document.getElementById('operacion-preview').value = numeroActual;
}
// Función para manejar las operaciones
function setOperacion(operacion) {
    operacionActual = operacion;
    primerNumero = parseFloat(numeroActual);
    numeroActual = ''; // Reiniciar para el segundo número
    document.getElementById('resultado').value = '';
    document.getElementById('operacion-preview').value = "".concat(primerNumero, " ").concat(operacion);
}
// Función para procesar la operación
function procesarResultado() {
    var segundoNumero = parseFloat(numeroActual);
    var resultado = 0;
    if (primerNumero !== null && segundoNumero !== null) {
        switch (operacionActual) {
            case 'sumar':
                resultado = calculadora.sumar(primerNumero, segundoNumero);
                break;
            case 'restar':
                resultado = calculadora.restar(primerNumero, segundoNumero);
                break;
            case 'multiplicar':
                resultado = calculadora.multiplicar(primerNumero, segundoNumero);
                break;
            case 'dividir':
                resultado = calculadora.dividir(primerNumero, segundoNumero);
                break;
            case 'potencia':
                resultado = calculadora.potencia(primerNumero, segundoNumero);
                break;
            case 'factorial':
                // Si la operación es factorial, solo utilizamos el primer número
                resultado = calculadora.factorial(primerNumero);
                break;
            default:
                resultado = 'Operación no válida';
                break;
        }
    }
    // Mostrar el resultado
    document.getElementById('resultado').value = resultado.toString();
    limpiar();
}
// Función para limpiar las variables y preparar para una nueva operación
function limpiar() {
    primerNumero = null;
    numeroActual = '';
    operacionActual = '';
    document.getElementById('operacion-preview').value = '';
}
// Agregar event listeners a los botones después de cargar el documento
document.addEventListener('DOMContentLoaded', function () {
    // Asignar eventos a los botones numéricos
    var numeros = document.querySelectorAll('.btn-numero');
    numeros.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var num = parseInt(btn.getAttribute('data-numero'));
            addNumber(num);
        });
    });
    // Asignar eventos a los botones de operación
    var operaciones = document.querySelectorAll('.btn-operacion');
    operaciones.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var operacion = btn.getAttribute('data-operacion');
            setOperacion(operacion);
        });
    });
    // Asignar evento al botón igual
    var igualBtn = document.getElementById('igual-btn');
    if (igualBtn) {
        igualBtn.addEventListener('click', procesarResultado);
    }
});
//Clase Cancion-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Clase Cancion en TypeScript
var Cancion = /** @class */ (function () {
    function Cancion(titulo, genero) {
        this.titulo = titulo;
        this.genero = genero;
        this._autor = ""; // Inicializamos el autor
    }
    Object.defineProperty(Cancion.prototype, "autor", {
        // Método get para obtener el autor
        get: function () {
            return this._autor;
        },
        // Método set para establecer el autor
        set: function (nuevoAutor) {
            this._autor = nuevoAutor;
        },
        enumerable: false,
        configurable: true
    });
    // Método para mostrar los datos de la canción
    Cancion.prototype.mostrarDatos = function () {
        return "T\u00EDtulo: ".concat(this.titulo, ", G\u00E9nero: ").concat(this.genero, ", Autor: ").concat(this.autor);
    };
    return Cancion;
}());
// Función para capturar los datos del formulario y mostrar la canción
function mostrarCancion() {
    var titulo = document.getElementById('titulo').value;
    var genero = document.getElementById('genero').value;
    var autor = document.getElementById('autor').value;
    if (titulo && genero && autor) {
        var cancion = new Cancion(titulo, genero);
        cancion.autor = autor; // Utilizamos el método set para establecer el autor
        // Mostrar los datos de la canción en el div resultadoCancion
        document.getElementById('resultadoCancion').innerText = cancion.mostrarDatos();
    }
    else {
        document.getElementById('resultadoCancion').innerText = 'Por favor, completa todos los campos.';
    }
}
// Exponemos la función para que pueda ser usada en el HTML
window.mostrarCancion = mostrarCancion;
//Clase Cancion-----------------------------------------------------------------------------------------------------------------------------------------------------------
var Cuenta = /** @class */ (function () {
    function Cuenta(nombre, cantidad, tipoCuenta, numeroCuenta) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.tipoCuenta = tipoCuenta;
        this.numeroCuenta = numeroCuenta;
    }
    Cuenta.prototype.depositar = function (cantidadDeposito) {
        if (cantidadDeposito < 5) {
            return "El valor a depositar debe ser mayor a $5.00.";
        }
        else {
            this.cantidad += cantidadDeposito;
            return "Se ha depositado correctamente. Cantidad depositada: $".concat(cantidadDeposito, ".");
        }
    };
    Cuenta.prototype.retirar = function (valor) {
        if (this.cantidad < 5) {
            return "No hay suficiente dinero en la cuenta para retirar.";
        }
        else if (valor > this.cantidad) {
            return "No tienes suficiente saldo para retirar esta cantidad.";
        }
        else {
            this.cantidad -= valor;
            return "Has retirado: $".concat(valor, ". Tu saldo restante es: $").concat(this.cantidad, ".");
        }
    };
    Cuenta.prototype.mostrarDatos = function () {
        var nombreElement = document.getElementById("nombre");
        var tipoCuentaElement = document.getElementById("tipoCuenta");
        var numeroCuentaElement = document.getElementById("numeroCuenta");
        var cantidadElement = document.getElementById("cantidad");
        if (nombreElement && tipoCuentaElement && numeroCuentaElement && cantidadElement) {
            nombreElement.textContent = this.nombre;
            tipoCuentaElement.textContent = this.tipoCuenta;
            numeroCuentaElement.textContent = this.numeroCuenta;
            cantidadElement.textContent = this.cantidad.toString();
        }
    };
    return Cuenta;
}());
// Crear un objeto de la clase Cuenta
var miCuenta = new Cuenta("Marcial Ordonez", 100000, "Ahorros", "123456789");
// Mostrar datos de la cuenta en la pantalla
miCuenta.mostrarDatos();
// Interacción con botones
var depositarBtn = document.getElementById("depositarBtn");
var retirarBtn = document.getElementById("retirarBtn");
var mensajeElement = document.getElementById("mensaje");
if (depositarBtn && retirarBtn && mensajeElement) {
    depositarBtn.addEventListener("click", function () {
        var mensaje = miCuenta.depositar(20);
        mensajeElement.textContent = mensaje;
        miCuenta.mostrarDatos(); // Actualizar el saldo en pantalla
    });
    retirarBtn.addEventListener("click", function () {
        var mensaje = miCuenta.retirar(10);
        mensajeElement.textContent = mensaje;
        miCuenta.mostrarDatos(); // Actualizar el saldo en pantalla
    });
}
//Clase Persona-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Clase abstracta Persona
var Persona = /** @class */ (function () {
    function Persona(nombre, apellido, direccion, telefono, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.edad = edad;
    }
    // Método para verificar si es mayor de edad
    Persona.prototype.esMayorDeEdad = function () {
        return this.edad >= 18 ? "Es mayor de edad." : "No es mayor de edad.";
    };
    return Persona;
}());
// Clase Empleado que hereda de Persona
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(nombre, apellido, direccion, telefono, edad, sueldo) {
        var _this = _super.call(this, nombre, apellido, direccion, telefono, edad) || this;
        _this.sueldo = sueldo;
        return _this;
    }
    // Método para cargar el sueldo
    Empleado.prototype.cargarSueldo = function (sueldo) {
        this.sueldo = sueldo;
    };
    // Método para imprimir el sueldo
    Empleado.prototype.imprimirSueldo = function () {
        return "Sueldo: $".concat(this.sueldo);
    };
    // Implementación del método abstracto para mostrar los datos personales
    Empleado.prototype.mostrarDatos = function () {
        // Mostrar los datos en el HTML
        document.getElementById('nombre').textContent = this.nombre;
        document.getElementById('apellido').textContent = this.apellido;
        document.getElementById('direccion').textContent = this.direccion;
        document.getElementById('telefono').textContent = this.telefono;
        document.getElementById('edad').textContent = this.edad.toString();
        document.getElementById('mayorDeEdad').textContent = this.esMayorDeEdad();
        document.getElementById('sueldo').textContent = this.sueldo.toString();
    };
    return Empleado;
}(Persona));
// Crear un objeto de la clase Empleado
var empleado = new Empleado("Marcial", "Ordonez", "Calle Falsa 123", "123-456-789", 30, 2500);
// Mostrar los datos en la página
empleado.mostrarDatos();
/*
class EncabezadoPagina {
    titulo: string;
    color: string;
    fuente: string;
    alineacion: string;
    headerElement: HTMLElement | null = null;

    constructor(titulo: string = "Título por defecto", color: string = "white", fuente: string = "Arial") {
        this.titulo = titulo;
        this.color = color;
        this.fuente = fuente;
        this.alineacion = "left";  // Alineación por defecto
    }

    obtenerPropiedades(): { titulo: string, color: string, fuente: string, alineacion: string } {
        return {
            titulo: this.titulo,
            color: this.color,
            fuente: this.fuente,
            alineacion: this.alineacion
        };
    }

    establecerAlineacion(alineacion: "left" | "center" | "right"): void {
        const opcionesValidas: string[] = ["center", "right", "left"];
        if (opcionesValidas.indexOf(alineacion) !== -1) {
            this.alineacion = alineacion;
        } else {
            console.error(`Alineación no válida. Debe ser una de las siguientes: ${opcionesValidas.join(", ")}`);
        }
    }

    aplicarEstilos(container: HTMLElement): void {
        // Limpiar contenido anterior
        container.innerHTML = "";

        // Crear el nuevo título
        const headerElement = document.createElement('h1');
        headerElement.textContent = this.titulo;
        headerElement.style.color = this.color;
        headerElement.style.fontFamily = this.fuente;
        headerElement.style.textAlign = this.alineacion;

        // Añadir el título al contenedor de previsualización
        container.appendChild(headerElement);
    }

    imprimirPropiedades(): void {
        const propiedades = this.obtenerPropiedades();
        console.log(`Título: ${propiedades.titulo}`);
        console.log(`Color: ${propiedades.color}`);
        console.log(`Fuente: ${propiedades.fuente}`);
        console.log(`Alineación: ${propiedades.alineacion}`);
    }
}

// Instanciar la clase
const encabezado = new EncabezadoPagina();

// Obtener referencias a los elementos del DOM
const tituloInput = document.getElementById('titulo') as HTMLInputElement;
const alineacionSelect = document.getElementById('alineacion') as HTMLSelectElement;
const applyBtn = document.getElementById('apply-btn');
const printBtn = document.getElementById('print-btn');
const titlePreview = document.getElementById('title-preview');

// Función para aplicar el título y alineación
applyBtn?.addEventListener('click', () => {
    const titulo = tituloInput.value;
    const alineacion = alineacionSelect.value as "left" | "center" | "right";

    if (titulo) {
        encabezado.titulo = titulo; // Establecer el nuevo título
    }

    encabezado.establecerAlineacion(alineacion); // Establecer la alineación
    encabezado.aplicarEstilos(titlePreview!); // Aplicar el estilo y mostrar el título en la previsualización
});

// Función para imprimir las propiedades en la consola
printBtn?.addEventListener('click', () => {
    encabezado.imprimirPropiedades(); // Imprimir propiedades en la consola
});
*/ 
