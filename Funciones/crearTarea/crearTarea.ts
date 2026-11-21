import type {
  DificultadTarea,
  EstadoTarea,
  Tarea,
  TareaInput,
  TareaUpdate,
} from '../../Tipos/tarea';
import { Dificultades, Estados } from '../../Tipos/tarea';

export function normalizarEstado(valor: string | undefined): EstadoTarea {
  const clave = (valor ?? '').trim().toLowerCase().replace(/\s+/g, '_');

  if (clave === 'pendiente' || clave === 'p') return Estados.pendiente;
  if (clave === 'en_curso' || clave === 'en-curso' || clave === 'e') return Estados.en_curso;
  if (clave === 'terminada' || clave === 't') return Estados.terminada;
  if (clave === 'cancelada' || clave === 'c') return Estados.cancelada;

  return Estados.pendiente;
}

export function normalizarDificultad(valor: string | undefined): DificultadTarea {
  const clave = (valor ?? '').trim().toLowerCase();

  if (clave === 'medio' || clave === 'm') return Dificultades.medio;
  if (clave === 'dificil' || clave === 'd') return Dificultades.dificil;

  return Dificultades.facil;
}

export function crearTarea(tareas: readonly Tarea[], datos: TareaInput): Tarea[] {
  const titulo = (datos.titulo ?? '').trim();

  if (!titulo) {
    throw new Error('El título de la tarea es obligatorio.');
  }

  const fechaCreacion = datos.fechaCreacion instanceof Date ? new Date(datos.fechaCreacion) : new Date();
  const ultimaEdicion = datos.ultimaEdicion instanceof Date ? new Date(datos.ultimaEdicion) : new Date(fechaCreacion);
  const id = datos.id ?? `tarea-${tareas.length + 1}`;

  const nuevaTarea: Tarea = Object.freeze({
    id,
    titulo,
    descripcion: (datos.descripcion ?? '').trim(),
    estado: normalizarEstado(typeof datos.estado === 'string' ? datos.estado : undefined),
    fechaCreacion,
    ultimaEdicion,
    fechaVencimiento: datos.fechaVencimiento instanceof Date ? new Date(datos.fechaVencimiento) : undefined,
    dificultad: normalizarDificultad(typeof datos.dificultad === 'string' ? datos.dificultad : undefined),
  });

  return [...tareas, nuevaTarea];
}

export function filtrarTareas(tareas: readonly Tarea[], filtro: string = 'todas'): Tarea[] {
  const filtroNormalizado = filtro.trim().toLowerCase();

  if (!filtroNormalizado || filtroNormalizado === 'todas') {
    return [...tareas];
  }

  const estadoSeleccionado = normalizarEstado(filtroNormalizado);
  return tareas.filter((tarea) => tarea.estado === estadoSeleccionado);
}

export function ordenarTareas(
  tareas: readonly Tarea[],
  criterio: 'titulo' | 'estado' | 'dificultad' | 'fechaCreacion' | 'fechaVencimiento' = 'fechaCreacion',
  direccion: 'asc' | 'desc' = 'asc',
): Tarea[] {
  const copia = [...tareas];

  const valor = (tarea: Tarea): string | number | Date => {
    switch (criterio) {
      case 'titulo':
        return tarea.titulo.toLowerCase();
      case 'estado':
        return tarea.estado;
      case 'dificultad':
        return tarea.dificultad;
      case 'fechaVencimiento':
        return tarea.fechaVencimiento ?? new Date(0);
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

export function actualizarTarea(tareas: readonly Tarea[], id: string, cambios: TareaUpdate): Tarea[] {
  return tareas.map((tarea) => {
    if (tarea.id !== id) {
      return tarea;
    }

    const tareaActualizada: Tarea = Object.freeze({
      ...tarea,
      ...cambios,
      descripcion: cambios.descripcion ?? tarea.descripcion,
      estado: cambios.estado ? normalizarEstado(String(cambios.estado)) : tarea.estado,
      dificultad: cambios.dificultad ? normalizarDificultad(String(cambios.dificultad)) : tarea.dificultad,
      fechaVencimiento: cambios.fechaVencimiento instanceof Date ? new Date(cambios.fechaVencimiento) : tarea.fechaVencimiento,
      ultimaEdicion: cambios.ultimaEdicion instanceof Date ? new Date(cambios.ultimaEdicion) : tarea.ultimaEdicion,
    });

    return tareaActualizada;
  });
}

export function crearInstanciaTarea(datos: TareaInput): Tarea {
  const tarea = crearTarea([], datos);
  const [primeraTarea] = tarea;

  if (!primeraTarea) {
    throw new Error('No se pudo crear la instancia de la tarea.');
  }

  return primeraTarea;
}

export default crearTarea;
