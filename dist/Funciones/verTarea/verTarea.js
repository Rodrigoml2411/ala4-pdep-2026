"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verTareas = void 0;
exports.mostrarMenuVerTareas = mostrarMenuVerTareas;
exports.normalizarFiltro = normalizarFiltro;
exports.filtrarTareas = filtrarTareas;
exports.verTarea = verTarea;
const crearTarea_1 = require("../crearTarea/crearTarea");
function mostrarMenuVerTareas() {
    console.log('\nVer tareas:');
    console.log('[1] - Todas');
    console.log('[2] - Pendientes');
    console.log('[3] - En curso');
    console.log('[4] - Terminadas');
    console.log('[5] - Canceladas');
}
function normalizarFiltro(filtro) {
    const valor = filtro.trim().toLowerCase();
    if (!valor || valor === 'todas' || valor === '1')
        return 'todas';
    if (valor === 'pendiente' || valor === 'pendientes' || valor === '2')
        return 'pendiente';
    if (valor === 'en_curso' || valor === 'en curso' || valor === '3')
        return 'en_curso';
    if (valor === 'terminada' || valor === 'terminadas' || valor === '4')
        return 'terminada';
    if (valor === 'cancelada' || valor === 'canceladas' || valor === '5')
        return 'cancelada';
    return 'todas';
}
function filtrarTareas(tareas, filtro = 'todas') {
    const filtroNormalizado = normalizarFiltro(filtro);
    if (filtroNormalizado === 'todas') {
        return [...tareas];
    }
    return tareas.filter((tarea) => tarea.estado === (0, crearTarea_1.normalizarEstado)(filtroNormalizado));
}
function verTarea(tareas, filtro = 'todas') {
    return filtrarTareas(tareas, filtro);
}
exports.verTareas = verTarea;
exports.default = verTarea;
//# sourceMappingURL=verTarea.js.map