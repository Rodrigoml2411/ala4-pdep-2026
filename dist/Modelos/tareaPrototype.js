"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tareaPrototype = void 0;
exports.crearInstanciaTarea = crearInstanciaTarea;
const crearTarea_1 = require("../Funciones/crearTarea/crearTarea");
exports.tareaPrototype = {
    mostrarInfo() {
        console.log(`Título: ${this.titulo}`);
        console.log(`Descripción: ${this.descripcion}`);
        console.log(`Estado: ${this.estado}`);
        console.log(`Dificultad: ${this.dificultad}`);
        console.log(`Fecha de creación: ${this.fechaCreacion.toISOString()}`);
    },
    cambiarEstado(nuevoEstado) {
        return { ...this, estado: nuevoEstado, ultimaEdicion: new Date() };
    },
};
function crearInstanciaTarea(datos) {
    const tarea = (0, crearTarea_1.crearTarea)([], datos);
    const [primeraTarea] = tarea;
    if (!primeraTarea) {
        throw new Error('No se pudo crear la tarea.');
    }
    return primeraTarea;
}
//# sourceMappingURL=tareaPrototype.js.map