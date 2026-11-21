import type { FiltroTarea, Tarea } from '../../Tipos/tarea';
import { normalizarEstado } from '../crearTarea/crearTarea';

export function mostrarMenuVerTareas(): void {
  console.log('\nVer tareas:');
  console.log('[1] - Todas');
  console.log('[2] - Pendientes');
  console.log('[3] - En curso');
  console.log('[4] - Terminadas');
  console.log('[5] - Canceladas');
}

export function normalizarFiltro(filtro: string): FiltroTarea {
  const valor = filtro.trim().toLowerCase();

  if (!valor || valor === 'todas' || valor === '1') return 'todas';
  if (valor === 'pendiente' || valor === 'pendientes' || valor === '2') return 'pendiente';
  if (valor === 'en_curso' || valor === 'en curso' || valor === '3') return 'en_curso';
  if (valor === 'terminada' || valor === 'terminadas' || valor === '4') return 'terminada';
  if (valor === 'cancelada' || valor === 'canceladas' || valor === '5') return 'cancelada';

  return 'todas';
}

export function filtrarTareas(tareas: readonly Tarea[], filtro: string = 'todas'): Tarea[] {
  const filtroNormalizado = normalizarFiltro(filtro);

  if (filtroNormalizado === 'todas') {
    return [...tareas];
  }

  return tareas.filter((tarea) => tarea.estado === normalizarEstado(filtroNormalizado));
}

export function verTarea(tareas: readonly Tarea[], filtro: string = 'todas'): Tarea[] {
  return filtrarTareas(tareas, filtro);
}

export const verTareas = verTarea;
export default verTarea;
