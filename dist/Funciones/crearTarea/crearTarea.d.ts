import type { DificultadTarea, EstadoTarea, Tarea, TareaInput, TareaUpdate } from '../../Tipos/tarea';
export declare function normalizarEstado(valor: string | undefined): EstadoTarea;
export declare function normalizarDificultad(valor: string | undefined): DificultadTarea;
export declare function crearTarea(tareas: readonly Tarea[], datos: TareaInput): Tarea[];
export declare function filtrarTareas(tareas: readonly Tarea[], filtro?: string): Tarea[];
export declare function ordenarTareas(tareas: readonly Tarea[], criterio?: 'titulo' | 'estado' | 'dificultad' | 'fechaCreacion' | 'fechaVencimiento', direccion?: 'asc' | 'desc'): Tarea[];
export declare function actualizarTarea(tareas: readonly Tarea[], id: string, cambios: TareaUpdate): Tarea[];
export declare function crearInstanciaTarea(datos: TareaInput): Tarea;
export default crearTarea;
//# sourceMappingURL=crearTarea.d.ts.map