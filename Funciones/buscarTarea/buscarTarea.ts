import type { Tarea } from '../../Tipos/tarea';

export function buscarTareaPorNombre(tareas: readonly Tarea[], nombreBuscado: string): Tarea[] {
  const termino = nombreBuscado.trim().toLowerCase();

  if (termino === '') {
    return [...tareas];
  }

  return tareas.filter((tarea) => tarea.titulo.toLowerCase().includes(termino));
}

export const buscarTarea = buscarTareaPorNombre;
export default buscarTareaPorNombre;
