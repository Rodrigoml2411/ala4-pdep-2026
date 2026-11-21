"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estado = exports.dificultad = void 0;
const tarea_1 = require("../Tipos/tarea");
exports.dificultad = Object.freeze({
    facil: tarea_1.Dificultades.facil,
    medio: tarea_1.Dificultades.medio,
    dificil: tarea_1.Dificultades.dificil,
});
exports.estado = Object.freeze({
    pendiente: tarea_1.Estados.pendiente,
    en_curso: tarea_1.Estados.en_curso,
    terminada: tarea_1.Estados.terminada,
    cancelada: tarea_1.Estados.cancelada,
});
exports.default = { dificultad: exports.dificultad, estado: exports.estado };
//# sourceMappingURL=dificultad.js.map