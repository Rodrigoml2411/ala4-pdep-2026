"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const strict_1 = __importDefault(require("node:assert/strict"));
const crearTarea_1 = require("../Funciones/crearTarea/crearTarea");
const baseDate = new Date('2026-01-10T00:00:00.000Z');
const baseDate2 = new Date('2026-01-11T00:00:00.000Z');
const tarea1 = {
    id: 'a1',
    titulo: 'Preparar entrega',
    descripcion: 'Revisar informe final',
    estado: 'pendiente',
    fechaCreacion: baseDate,
    ultimaEdicion: baseDate,
    fechaVencimiento: new Date('2026-01-15T00:00:00.000Z'),
    dificultad: 'facil',
};
const tarea2 = {
    id: 'a2',
    titulo: 'Revisar pruebas',
    descripcion: 'Validar casos de borde',
    estado: 'en_curso',
    fechaCreacion: baseDate2,
    ultimaEdicion: baseDate2,
    fechaVencimiento: new Date('2026-01-20T00:00:00.000Z'),
    dificultad: 'medio',
};
(0, node_test_1.default)('normaliza estado y dificultad de forma determinista', () => {
    strict_1.default.equal((0, crearTarea_1.normalizarEstado)('en curso'), 'en_curso');
    strict_1.default.equal((0, crearTarea_1.normalizarEstado)('TERMINADA'), 'terminada');
    strict_1.default.equal((0, crearTarea_1.normalizarDificultad)('DIFICIL'), 'dificil');
    strict_1.default.equal((0, crearTarea_1.normalizarDificultad)('cualquiera'), 'facil');
});
(0, node_test_1.default)('crea una tarea nueva sin mutar la lista original', () => {
    var _a, _b;
    const tareasIniciales = [tarea1];
    const nueva = (0, crearTarea_1.crearTarea)(tareasIniciales, {
        titulo: 'Subir cambios',
        descripcion: 'Empujar al repositorio',
        estado: 'terminada',
        dificultad: 'dificil',
        fechaCreacion: new Date('2026-01-12T00:00:00.000Z'),
        ultimaEdicion: new Date('2026-01-12T00:00:00.000Z'),
        fechaVencimiento: new Date('2026-01-14T00:00:00.000Z'),
    });
    strict_1.default.equal(tareasIniciales.length, 1);
    strict_1.default.equal(nueva.length, 2);
    strict_1.default.ok(nueva[1]);
    strict_1.default.equal((_a = nueva[1]) === null || _a === void 0 ? void 0 : _a.titulo, 'Subir cambios');
    strict_1.default.ok(tareasIniciales[0]);
    strict_1.default.equal((_b = tareasIniciales[0]) === null || _b === void 0 ? void 0 : _b.titulo, 'Preparar entrega');
});
(0, node_test_1.default)('filtra y ordena tareas sin mutar el arreglo original', () => {
    var _a, _b;
    const tareas = [tarea1, tarea2];
    const filtradas = (0, crearTarea_1.filtrarTareas)(tareas, 'pendiente');
    const ordenadas = (0, crearTarea_1.ordenarTareas)(tareas, 'titulo');
    strict_1.default.deepEqual(filtradas, [tarea1]);
    strict_1.default.ok(ordenadas[0]);
    strict_1.default.ok(ordenadas[1]);
    strict_1.default.equal((_a = ordenadas[0]) === null || _a === void 0 ? void 0 : _a.titulo, 'Preparar entrega');
    strict_1.default.equal((_b = ordenadas[1]) === null || _b === void 0 ? void 0 : _b.titulo, 'Revisar pruebas');
    strict_1.default.equal(tareas.length, 2);
});
(0, node_test_1.default)('actualiza una tarea generando una nueva copia inmutable', () => {
    var _a, _b, _c;
    const actualizada = (0, crearTarea_1.actualizarTarea)([tarea1, tarea2], 'a1', {
        descripcion: 'Revisado y corregido',
        estado: 'en_curso',
        ultimaEdicion: new Date('2026-01-13T00:00:00.000Z'),
    });
    strict_1.default.ok(actualizada[0]);
    strict_1.default.ok(actualizada[1]);
    strict_1.default.equal((_a = actualizada[0]) === null || _a === void 0 ? void 0 : _a.descripcion, 'Revisado y corregido');
    strict_1.default.equal((_b = actualizada[0]) === null || _b === void 0 ? void 0 : _b.estado, 'en_curso');
    strict_1.default.equal((_c = actualizada[1]) === null || _c === void 0 ? void 0 : _c.titulo, 'Revisar pruebas');
    strict_1.default.equal(tarea1.estado, 'pendiente');
});
//# sourceMappingURL=tareas.fp.test.js.map