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