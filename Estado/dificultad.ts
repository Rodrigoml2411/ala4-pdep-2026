import { Dificultades, Estados } from '../Tipos/tarea';

export const dificultad = Object.freeze({
  facil: Dificultades.facil,
  medio: Dificultades.medio,
  dificil: Dificultades.dificil,
});

export const estado = Object.freeze({
  pendiente: Estados.pendiente,
  en_curso: Estados.en_curso,
  terminada: Estados.terminada,
  cancelada: Estados.cancelada,
});

export default { dificultad, estado };
