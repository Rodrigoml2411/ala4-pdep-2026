"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarTarea = void 0;
exports.buscarTareaPorNombre = buscarTareaPorNombre;
function buscarTareaPorNombre(tareas, nombreBuscado) {
    const termino = nombreBuscado.trim().toLowerCase();
    if (termino === '') {
        return [...tareas];
    }
    return tareas.filter((tarea) => tarea.titulo.toLowerCase().includes(termino));
}
exports.buscarTarea = buscarTareaPorNombre;
exports.default = buscarTareaPorNombre;
//# sourceMappingURL=buscarTarea.js.map