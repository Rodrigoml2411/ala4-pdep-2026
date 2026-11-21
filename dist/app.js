"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const buscarTarea_1 = require("./Funciones/buscarTarea/buscarTarea");
const crearTarea_1 = require("./Funciones/crearTarea/crearTarea");
const verTarea_1 = require("./Funciones/verTarea/verTarea");
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let tareas = [];
function preguntar(mensaje) {
    return new Promise((resolve) => {
        rl.question(mensaje, (respuesta) => resolve(respuesta));
    });
}
function mostrarLista(lista) {
    if (lista.length === 0) {
        console.log('No hay tareas registradas.');
        return;
    }
    console.log('\nEstas son tus tareas:');
    lista.forEach((tarea, indice) => {
        console.log(`\n${indice + 1}. ${tarea.titulo}`);
        console.log(`   Estado: ${tarea.estado}`);
        console.log(`   Dificultad: ${tarea.dificultad}`);
        console.log(`   Descripción: ${tarea.descripcion || 'Sin descripción'}`);
        console.log(`   Fecha de creación: ${tarea.fechaCreacion.toISOString().slice(0, 10)}`);
    });
}
function parsearFecha(valor) {
    const texto = valor.trim();
    if (!texto)
        return undefined;
    const fecha = new Date(`${texto}T00:00:00.000Z`);
    return Number.isNaN(fecha.getTime()) ? undefined : fecha;
}
async function crearTareaDesdePrompt(ahora) {
    console.log('Creando una nueva tarea...');
    const titulo = await preguntar('Ingrese el título: ');
    const descripcion = await preguntar('Ingrese la descripción: ');
    const estado = await preguntar('Ingrese el estado (pendiente, en_curso, terminada, cancelada): ');
    const dificultad = await preguntar('Ingrese la dificultad (facil, medio, dificil): ');
    const vencimiento = await preguntar('Ingrese la fecha de vencimiento (YYYY-MM-DD, opcional): ');
    const entrada = {
        id: `tarea-${Date.now()}`,
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        estado: (0, crearTarea_1.normalizarEstado)(estado),
        dificultad: (0, crearTarea_1.normalizarDificultad)(dificultad),
        fechaCreacion: new Date(ahora),
        ultimaEdicion: new Date(ahora),
        fechaVencimiento: parsearFecha(vencimiento),
    };
    tareas = (0, crearTarea_1.crearTarea)(tareas, entrada);
    console.log(`Tarea creada: ${entrada.titulo}`);
}
async function buscarTareaDesdePrompt() {
    const busqueda = await preguntar('Ingrese el título o referencia a buscar: ');
    const resultados = (0, buscarTarea_1.buscarTarea)(tareas, busqueda);
    mostrarLista(resultados);
}
async function menu() {
    let opcion = 0;
    do {
        console.log('\nHola Usuario');
        console.log('¿Qué desea hacer?');
        console.log('--------------------------------');
        console.log('[1] - Ver tareas');
        console.log('[2] - Crear tarea');
        console.log('[3] - Buscar tarea');
        console.log('[4] - Salir');
        const respuesta = await preguntar('Seleccione una opción: ');
        opcion = Number.parseInt(respuesta, 10);
        switch (opcion) {
            case 1:
                mostrarLista((0, verTarea_1.verTareas)(tareas, 'todas'));
                break;
            case 2:
                await crearTareaDesdePrompt(new Date());
                break;
            case 3:
                await buscarTareaDesdePrompt();
                break;
            case 4:
                console.log('Saliendo del programa...');
                rl.close();
                break;
            default:
                console.log('Opción inválida, por favor seleccione una opción válida.');
        }
    } while (opcion !== 4);
}
menu().catch((error) => {
    console.error('Ocurrió un error:', error);
    rl.close();
});
//# sourceMappingURL=app.js.map