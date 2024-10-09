
//Encabezado ------------------------------------------------------------------------------------------------------------------------------------------------------------------
class EncabezadoPagina {
    titulo: string;
    color: string;
    fuente: string;
    alineacion: string;
    headerElement: HTMLElement | null = null;

    constructor(titulo: string = "Título por defecto") {
        this.titulo = titulo;
        this.color = "white";
        this.fuente = "Arial";
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

    establecerFuente(fuente: "Verdana" | "Courier New" | "Helvética"): void {
        const opcionesValidas: string[] = ["Courier New", "Helvética", "Verdana"];
        if (opcionesValidas.indexOf(fuente) !== -1) {
            this.fuente = fuente;
        } else {
            console.error(`Fuente no válida. Debe ser una de las siguientes: ${opcionesValidas.join(", ")}`);
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

    eliminarTitulo(): void {
        if (this.headerElement) {
            this.headerElement.remove();
            this.headerElement = null; // Reset element to prevent errors
        }
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
const fuenteSelect = document.getElementById('fuente') as HTMLInputElement;
const alineacionSelect = document.getElementById('alineacion') as HTMLSelectElement;
const applyBtn = document.getElementById('apply-btn');
const printBtn = document.getElementById('print-btn');
const titlePreview = document.getElementById('title-preview');

// Función para aplicar el título y alineación
applyBtn?.addEventListener('click', () => {
    const titulo = tituloInput.value;
    const alineacion = alineacionSelect.value as "left" | "center" | "right";
    const fuente = fuenteSelect.value as "Verdana" | "Courier New" | "Helvética";

    if (titulo) {
        encabezado.titulo = titulo; // Establecer el nuevo título
    }

    encabezado.establecerAlineacion(alineacion); // Establecer la alineación
    encabezado.establecerFuente(fuente);
    encabezado.aplicarEstilos(titlePreview!); // Aplicar el estilo y mostrar el título
});

// Función para imprimir las propiedades en la consola
printBtn?.addEventListener('click', () => {
    encabezado.imprimirPropiedades(); // Imprimir propiedades en la consola
});


//Clase calculadora-----------------------------------------------------------------------------------------------------------------------------------------------------------
class Calculadora {
    sumar(a: number, b: number): number {
        return a + b;
    }

    restar(a: number, b: number): number {
        return a - b;
    }

    multiplicar(a: number, b: number): number {
        return a * b;
    }

    dividir(a: number, b: number): number | string {
        if (b === 0) {
            return "Error: División por cero";
        }
        return a / b;
    }

    potencia(base: number, exponente: number): number {
        return Math.pow(base, exponente);
    }

    factorial(n: number): number | string {
        if (n < 0) {
            return "Error: Factorial no definido para números negativos";
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        let resultado = 1;
        for (let i = 2; i <= n; i++) {
            resultado *= i;
        }
        return resultado;
    }
}

// Variables globales
const calculadora = new Calculadora();
let operacionActual: string = '';
let numeroActual: string = '';
let primerNumero: number | null = null;

// Función para añadir número al input
function addNumber(num: number): void {
    numeroActual += num.toString(); // Convertir el número a string y concatenarlo
    (document.getElementById('resultado') as HTMLInputElement).value = numeroActual;
    (document.getElementById('operacion-preview') as HTMLInputElement).value = numeroActual;
}

// Función para manejar las operaciones
function setOperacion(operacion: string): void {
    operacionActual = operacion;
    primerNumero = parseFloat(numeroActual);
    numeroActual = ''; // Reiniciar para el segundo número
    (document.getElementById('resultado') as HTMLInputElement).value = '';
    (document.getElementById('operacion-preview') as HTMLInputElement).value = `${primerNumero} ${operacion}`;
}

// Función para procesar la operación
function procesarResultado(): void {
    const segundoNumero: number = parseFloat(numeroActual);
    let resultado: number | string = 0;

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
                resultado = calculadora.factorial(primerNumero!);
                break;
            default:
                resultado = 'Operación no válida';
                break;
        }
    }

    // Mostrar el resultado
    (document.getElementById('resultado') as HTMLInputElement).value = resultado.toString();
    limpiar();
}

// Función para limpiar las variables y preparar para una nueva operación
function limpiar(): void {
    primerNumero = null;
    numeroActual = '';
    operacionActual = '';
    (document.getElementById('operacion-preview') as HTMLInputElement).value = '';
}

// Agregar event listeners a los botones después de cargar el documento
document.addEventListener('DOMContentLoaded', () => {
    // Asignar eventos a los botones numéricos
    const numeros = document.querySelectorAll('.btn-numero');
    numeros.forEach((btn) => {
        btn.addEventListener('click', () => {
            const num = parseInt(btn.getAttribute('data-numero')!);
            addNumber(num);
        });
    });

    // Asignar eventos a los botones de operación
    const operaciones = document.querySelectorAll('.btn-operacion');
    operaciones.forEach((btn) => {
        btn.addEventListener('click', () => {
            const operacion = btn.getAttribute('data-operacion')!;
            setOperacion(operacion);
        });
    });

    // Asignar evento al botón igual
    const igualBtn = document.getElementById('igual-btn');
    if (igualBtn) {
        igualBtn.addEventListener('click', procesarResultado);
    }
});

//Clase Cancion-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Clase Cancion en TypeScript
class Cancion {
    titulo: string;
    genero: string;
    private _autor: string; // Atributo privado

    constructor(titulo: string, genero: string) {
        this.titulo = titulo;
        this.genero = genero;
        this._autor = ""; // Inicializamos el autor
    }

    // Método get para obtener el autor
    get autor(): string {
        return this._autor;
    }

    // Método set para establecer el autor
    set autor(nuevoAutor: string) {
        this._autor = nuevoAutor;
    }

    // Método para mostrar los datos de la canción
    mostrarDatos(): string {
        return `Título: ${this.titulo}, Género: ${this.genero}, Autor: ${this.autor}`;
    }
}

// Función para capturar los datos del formulario y mostrar la canción
function mostrarCancion(): void {
    const titulo = (document.getElementById('titulo') as HTMLInputElement).value;
    const genero = (document.getElementById('genero') as HTMLInputElement).value;
    const autor = (document.getElementById('autor') as HTMLInputElement).value;

    if (titulo && genero && autor) {
        const cancion = new Cancion(titulo, genero);
        cancion.autor = autor; // Utilizamos el método set para establecer el autor

        // Mostrar los datos de la canción en el div resultadoCancion
        (document.getElementById('resultadoCancion') as HTMLParagraphElement).innerText = cancion.mostrarDatos();
    } else {
        (document.getElementById('resultadoCancion') as HTMLParagraphElement).innerText = 'Por favor, completa todos los campos.';
    }
}

// Exponemos la función para que pueda ser usada en el HTML
(window as any).mostrarCancion = mostrarCancion;

//Clase Cancion-----------------------------------------------------------------------------------------------------------------------------------------------------------
class Cuenta {
    nombre: string;
    cantidad: number;
    tipoCuenta: string;
    numeroCuenta: string;

    constructor(nombre: string, cantidad: number, tipoCuenta: string, numeroCuenta: string) {
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.tipoCuenta = tipoCuenta;
        this.numeroCuenta = numeroCuenta;
    }

    depositar(cantidadDeposito: number): string {
        if (cantidadDeposito < 5) {
            return "El valor a depositar debe ser mayor a $5.00.";
        } else {
            this.cantidad += cantidadDeposito;
            return `Se ha depositado correctamente. Cantidad depositada: $${cantidadDeposito}.`;
        }
    }

    retirar(valor: number): string {
        if (this.cantidad < 5) {
            return "No hay suficiente dinero en la cuenta para retirar.";
        } else if (valor > this.cantidad) {
            return "No tienes suficiente saldo para retirar esta cantidad.";
        } else {
            this.cantidad -= valor;
            return `Has retirado: $${valor}. Tu saldo restante es: $${this.cantidad}.`;
        }
    }

    mostrarDatos(): void {
        const nombreElement = document.getElementById("nombre");
        const tipoCuentaElement = document.getElementById("tipoCuenta");
        const numeroCuentaElement = document.getElementById("numeroCuenta");
        const cantidadElement = document.getElementById("cantidad");

        if (nombreElement && tipoCuentaElement && numeroCuentaElement && cantidadElement) {
            nombreElement.textContent = this.nombre;
            tipoCuentaElement.textContent = this.tipoCuenta;
            numeroCuentaElement.textContent = this.numeroCuenta;
            cantidadElement.textContent = this.cantidad.toString();
        }
    }
}

// Crear un objeto de la clase Cuenta
const miCuenta = new Cuenta("Marcial Ordonez", 100000, "Ahorros", "123456789");

// Mostrar datos de la cuenta en la pantalla
miCuenta.mostrarDatos();

// Interacción con botones
const depositarBtn = document.getElementById("depositarBtn");
const retirarBtn = document.getElementById("retirarBtn");
const mensajeElement = document.getElementById("mensaje");

if (depositarBtn && retirarBtn && mensajeElement) {
    depositarBtn.addEventListener("click", () => {
        const mensaje = miCuenta.depositar(20);
        mensajeElement.textContent = mensaje;
        miCuenta.mostrarDatos(); // Actualizar el saldo en pantalla
    });

    retirarBtn.addEventListener("click", () => {
        const mensaje = miCuenta.retirar(10);
        mensajeElement.textContent = mensaje;
        miCuenta.mostrarDatos(); // Actualizar el saldo en pantalla
    });
}

//Clase Persona-----------------------------------------------------------------------------------------------------------------------------------------------------------
// Clase abstracta Persona
abstract class Persona {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    edad: number;

    constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.edad = edad;
    }

    // Método para verificar si es mayor de edad
    esMayorDeEdad(): string {
        return this.edad >= 18 ? "Es mayor de edad." : "No es mayor de edad.";
    }

    // Método abstracto para mostrar los datos
    abstract mostrarDatos(): void;
}

// Clase Empleado que hereda de Persona
class Empleado extends Persona {
    sueldo: number;

    constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number, sueldo: number) {
        super(nombre, apellido, direccion, telefono, edad);
        this.sueldo = sueldo;
    }

    // Método para cargar el sueldo
    cargarSueldo(sueldo: number): void {
        this.sueldo = sueldo;
    }

    // Método para imprimir el sueldo
    imprimirSueldo(): string {
        return `Sueldo: $${this.sueldo}`;
    }

    // Implementación del método abstracto para mostrar los datos personales
    mostrarDatos(): void {
        // Mostrar los datos en el HTML
        (document.getElementById('nombre') as HTMLElement).textContent = this.nombre;
        (document.getElementById('apellido') as HTMLElement).textContent = this.apellido;
        (document.getElementById('direccion') as HTMLElement).textContent = this.direccion;
        (document.getElementById('telefono') as HTMLElement).textContent = this.telefono;
        (document.getElementById('edad') as HTMLElement).textContent = this.edad.toString();
        (document.getElementById('mayorDeEdad') as HTMLElement).textContent = this.esMayorDeEdad();
        (document.getElementById('sueldo') as HTMLElement).textContent = this.sueldo.toString();
    }
}

// Crear un objeto de la clase Empleado
const empleado = new Empleado("Marcial", "Ordonez", "Calle Falsa 123", "123-456-789", 30, 2500);

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