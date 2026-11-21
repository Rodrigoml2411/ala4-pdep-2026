import type { Tarea, TareaInput } from '../Tipos/tarea';
import { crearTarea } from '../Funciones/crearTarea/crearTarea';

export const tareaPrototype = {
  mostrarInfo(this: Tarea): void {
    console.log(`Título: ${this.titulo}`);
    console.log(`Descripción: ${this.descripcion}`);
    console.log(`Estado: ${this.estado}`);
    console.log(`Dificultad: ${this.dificultad}`);
    console.log(`Fecha de creación: ${this.fechaCreacion.toISOString()}`);
  },

  cambiarEstado(this: Tarea, nuevoEstado: string): Tarea {
    return { ...this, estado: nuevoEstado as Tarea['estado'], ultimaEdicion: new Date() };
  },
};

export function crearInstanciaTarea(datos: TareaInput): Tarea {
  const tarea = crearTarea([], datos);
  const [primeraTarea] = tarea;

  if (!primeraTarea) {
    throw new Error('No se pudo crear la tarea.');
  }

  return primeraTarea;
}