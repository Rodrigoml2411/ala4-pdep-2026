"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizarEstado = normalizarEstado;
exports.normalizarDificultad = normalizarDificultad;
exports.crearTarea = crearTarea;
exports.filtrarTareas = filtrarTareas;
exports.ordenarTareas = ordenarTareas;
exports.actualizarTarea = actualizarTarea;
exports.crearInstanciaTarea = crearInstanciaTarea;
const tarea_1 = require("../../Tipos/tarea");
function normalizarEstado(valor) {
    const clave = (valor !== null && valor !== void 0 ? valor : '').trim().toLowerCase().replace(/\s+/g, '_');
    if (clave === 'pendiente' || clave === 'p')
        return tarea_1.Estados.pendiente;
    if (clave === 'en_curso' || clave === 'en-curso' || clave === 'e')
        return tarea_1.Estados.en_curso;
    if (clave === 'terminada' || clave === 't')
        return tarea_1.Estados.terminada;
    if (clave === 'cancelada' || clave === 'c')
        return tarea_1.Estados.cancelada;
    return tarea_1.Estados.pendiente;
}
function normalizarDificultad(valor) {
    const clave = (valor !== null && valor !== void 0 ? valor : '').trim().toLowerCase();
    if (clave === 'medio' || clave === 'm')
        return tarea_1.Dificultades.medio;
    if (clave === 'dificil' || clave === 'd')
        return tarea_1.Dificultades.dificil;
    return tarea_1.Dificultades.facil;
}
function crearTarea(tareas, datos) {
    var _a, _b, _c;
    const titulo = ((_a = datos.titulo) !== null && _a !== void 0 ? _a : '').trim();
    if (!titulo) {
        throw new Error('El título de la tarea es obligatorio.');
    }
    const fechaCreacion = datos.fechaCreacion instanceof Date ? new Date(datos.fechaCreacion) : new Date();
    const ultimaEdicion = datos.ultimaEdicion instanceof Date ? new Date(datos.ultimaEdicion) : new Date(fechaCreacion);
    const id = (_b = datos.id) !== null && _b !== void 0 ? _b : `tarea-${tareas.length + 1}`;
    const nuevaTarea = Object.freeze({
        id,
        titulo,
        descripcion: ((_c = datos.descripcion) !== null && _c !== void 0 ? _c : '').trim(),
        estado: normalizarEstado(typeof datos.estado === 'string' ? datos.estado : undefined),
        fechaCreacion,
        ultimaEdicion,
        fechaVencimiento: datos.fechaVencimiento instanceof Date ? new Date(datos.fechaVencimiento) : undefined,
        dificultad: normalizarDificultad(typeof datos.dificultad === 'string' ? datos.dificultad : undefined),
    });
    return [...tareas, nuevaTarea];
}
function filtrarTareas(tareas, filtro = 'todas') {
    const filtroNormalizado = filtro.trim().toLowerCase();
    if (!filtroNormalizado || filtroNormalizado === 'todas') {
        return [...tareas];
    }
    const estadoSeleccionado = normalizarEstado(filtroNormalizado);
    return tareas.filter((tarea) => tarea.estado === estadoSeleccionado);
}
function ordenarTareas(tareas, criterio = 'fechaCreacion', direccion = 'asc') {
    const copia = [...tareas];
    const valor = (tarea) => {
        var _a;
        switch (criterio) {
            case 'titulo':
                return tarea.titulo.toLowerCase();
            case 'estado':
                return tarea.estado;
            case 'dificultad':
                return tarea.dificultad;
            case 'fechaVencimiento':
                return (_a = tarea.fechaVencimiento) !== null && _a !== void 0 ? _a : new Date(0);
            case 'fechaCreacion':
            default:
                return tarea.fechaCreacion;
        }
    };
    copia.sort((a, b) => {
        const izquierda = valor(a);
        const derecha = valor(b);
        const comparacion = String(izquierda).localeCompare(String(derecha), undefined, { numeric: true });
        return direccion === 'asc' ? comparacion : -comparacion;
    });
    return copia;
}
function actualizarTarea(tareas, id, cambios) {
    return tareas.map((tarea) => {
        var _a;
        if (tarea.id !== id) {
            return tarea;
        }
        const tareaActualizada = Object.freeze({
            ...tarea,
            ...cambios,
            descripcion: (_a = cambios.descripcion) !== null && _a !== void 0 ? _a : tarea.descripcion,
            estado: cambios.estado ? normalizarEstado(String(cambios.estado)) : tarea.estado,
            dificultad: cambios.dificultad ? normalizarDificultad(String(cambios.dificultad)) : tarea.dificultad,
            fechaVencimiento: cambios.fechaVencimiento instanceof Date ? new Date(cambios.fechaVencimiento) : tarea.fechaVencimiento,
            ultimaEdicion: cambios.ultimaEdicion instanceof Date ? new Date(cambios.ultimaEdicion) : tarea.ultimaEdicion,
        });
        return tareaActualizada;
    });
}
function crearInstanciaTarea(datos) {
    const tarea = crearTarea([], datos);
    const [primeraTarea] = tarea;
    if (!primeraTarea) {
        throw new Error('No se pudo crear la instancia de la tarea.');
    }
    return primeraTarea;
}
exports.default = crearTarea;
//# sourceMappingURL=crearTarea.js.map