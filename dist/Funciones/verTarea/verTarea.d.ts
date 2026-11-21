import type { FiltroTarea, Tarea } from '../../Tipos/tarea';
export declare function mostrarMenuVerTareas(): void;
export declare function normalizarFiltro(filtro: string): FiltroTarea;
export declare function filtrarTareas(tareas: readonly Tarea[], filtro?: string): Tarea[];
export declare function verTarea(tareas: readonly Tarea[], filtro?: string): Tarea[];
export declare const verTareas: typeof verTarea;
export default verTarea;
//# sourceMappingURL=verTarea.d.ts.map