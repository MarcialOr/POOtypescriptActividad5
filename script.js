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
