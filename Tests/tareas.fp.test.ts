import test from 'node:test';
import assert from 'node:assert/strict';

import {
  crearTarea,
  filtrarTareas,
  ordenarTareas,
  actualizarTarea,
  normalizarEstado,
  normalizarDificultad,
} from '../Funciones/crearTarea/crearTarea';

import type { Tarea } from '../Tipos/tarea';

const baseDate = new Date('2026-01-10T00:00:00.000Z');
const baseDate2 = new Date('2026-01-11T00:00:00.000Z');

const tarea1: Tarea = {
  id: 'a1',
  titulo: 'Preparar entrega',
  descripcion: 'Revisar informe final',
  estado: 'pendiente',
  fechaCreacion: baseDate,
  ultimaEdicion: baseDate,
  fechaVencimiento: new Date('2026-01-15T00:00:00.000Z'),
  dificultad: 'facil',
};

const tarea2: Tarea = {
  id: 'a2',
  titulo: 'Revisar pruebas',
  descripcion: 'Validar casos de borde',
  estado: 'en_curso',
  fechaCreacion: baseDate2,
  ultimaEdicion: baseDate2,
  fechaVencimiento: new Date('2026-01-20T00:00:00.000Z'),
  dificultad: 'medio',
};

test('normaliza estado y dificultad de forma determinista', () => {
  assert.equal(normalizarEstado('en curso'), 'en_curso');
  assert.equal(normalizarEstado('TERMINADA'), 'terminada');
  assert.equal(normalizarDificultad('DIFICIL'), 'dificil');
  assert.equal(normalizarDificultad('cualquiera'), 'facil');
});

test('crea una tarea nueva sin mutar la lista original', () => {
  const tareasIniciales: Tarea[] = [tarea1];
  const nueva = crearTarea(tareasIniciales, {
    titulo: 'Subir cambios',
    descripcion: 'Empujar al repositorio',
    estado: 'terminada',
    dificultad: 'dificil',
    fechaCreacion: new Date('2026-01-12T00:00:00.000Z'),
    ultimaEdicion: new Date('2026-01-12T00:00:00.000Z'),
    fechaVencimiento: new Date('2026-01-14T00:00:00.000Z'),
  });

  assert.equal(tareasIniciales.length, 1);
  assert.equal(nueva.length, 2);
  assert.ok(nueva[1]);
  assert.equal(nueva[1]?.titulo, 'Subir cambios');
  assert.ok(tareasIniciales[0]);
  assert.equal(tareasIniciales[0]?.titulo, 'Preparar entrega');
});

test('filtra y ordena tareas sin mutar el arreglo original', () => {
  const tareas = [tarea1, tarea2];
  const filtradas = filtrarTareas(tareas, 'pendiente');
  const ordenadas = ordenarTareas(tareas, 'titulo');

  assert.deepEqual(filtradas, [tarea1]);
  assert.ok(ordenadas[0]);
  assert.ok(ordenadas[1]);
  assert.equal(ordenadas[0]?.titulo, 'Preparar entrega');
  assert.equal(ordenadas[1]?.titulo, 'Revisar pruebas');
  assert.equal(tareas.length, 2);
});

test('actualiza una tarea generando una nueva copia inmutable', () => {
  const actualizada = actualizarTarea([tarea1, tarea2], 'a1', {
    descripcion: 'Revisado y corregido',
    estado: 'en_curso',
    ultimaEdicion: new Date('2026-01-13T00:00:00.000Z'),
  });

  assert.ok(actualizada[0]);
  assert.ok(actualizada[1]);
  assert.equal(actualizada[0]?.descripcion, 'Revisado y corregido');
  assert.equal(actualizada[0]?.estado, 'en_curso');
  assert.equal(actualizada[1]?.titulo, 'Revisar pruebas');
  assert.equal(tarea1.estado, 'pendiente');
});
