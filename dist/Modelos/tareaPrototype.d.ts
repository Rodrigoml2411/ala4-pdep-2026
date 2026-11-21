import type { Tarea, TareaInput } from '../Tipos/tarea';
export declare const tareaPrototype: {
    mostrarInfo(this: Tarea): void;
    cambiarEstado(this: Tarea, nuevoEstado: string): Tarea;
};
export declare function crearInstanciaTarea(datos: TareaInput): Tarea;
//# sourceMappingURL=tareaPrototype.d.ts.map