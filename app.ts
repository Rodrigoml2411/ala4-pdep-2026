import readline from 'readline';
import { buscarTarea } from './Funciones/buscarTarea/buscarTarea';
import { crearTarea, normalizarDificultad, normalizarEstado } from './Funciones/crearTarea/crearTarea';
import { verTareas } from './Funciones/verTarea/verTarea';
import type { Tarea, TareaInput } from './Tipos/tarea';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tareas: Tarea[] = [];

function preguntar(mensaje: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(mensaje, (respuesta) => resolve(respuesta));
  });
}

function mostrarLista(lista: readonly Tarea[]): void {
  if (lista.length === 0) {
    console.log('No hay tareas registradas.');
    return;
  }

  console.log('\nEstas son tus tareas:');
  lista.forEach((tarea, indice) => {
    console.log(`\n${indice + 1}. ${tarea.titulo}`);
    console.log(`   Estado: ${tarea.estado}`);
    console.log(`   Dificultad: ${tarea.dificultad}`);
    console.log(`   Descripción: ${tarea.descripcion || 'Sin descripción'}`);
    console.log(`   Fecha de creación: ${tarea.fechaCreacion.toISOString().slice(0, 10)}`);
  });
}

function parsearFecha(valor: string): Date | undefined {
  const texto = valor.trim();
  if (!texto) return undefined;
  const fecha = new Date(`${texto}T00:00:00.000Z`);
  return Number.isNaN(fecha.getTime()) ? undefined : fecha;
}

async function crearTareaDesdePrompt(ahora: Date): Promise<void> {
  console.log('Creando una nueva tarea...');

  const titulo = await preguntar('Ingrese el título: ');
  const descripcion = await preguntar('Ingrese la descripción: ');
  const estado = await preguntar('Ingrese el estado (pendiente, en_curso, terminada, cancelada): ');
  const dificultad = await preguntar('Ingrese la dificultad (facil, medio, dificil): ');
  const vencimiento = await preguntar('Ingrese la fecha de vencimiento (YYYY-MM-DD, opcional): ');

  const entrada: TareaInput = {
    id: `tarea-${Date.now()}`,
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    estado: normalizarEstado(estado),
    dificultad: normalizarDificultad(dificultad),
    fechaCreacion: new Date(ahora),
    ultimaEdicion: new Date(ahora),
    fechaVencimiento: parsearFecha(vencimiento),
  };

  tareas = crearTarea(tareas, entrada);
  console.log(`Tarea creada: ${entrada.titulo}`);
}

async function buscarTareaDesdePrompt(): Promise<void> {
  const busqueda = await preguntar('Ingrese el título o referencia a buscar: ');
  const resultados = buscarTarea(tareas, busqueda);
  mostrarLista(resultados);
}

async function menu(): Promise<void> {
  let opcion = 0;

  do {
    console.log('\nHola Usuario');
    console.log('¿Qué desea hacer?');
    console.log('--------------------------------');
    console.log('[1] - Ver tareas');
    console.log('[2] - Crear tarea');
    console.log('[3] - Buscar tarea');
    console.log('[4] - Salir');

    const respuesta = await preguntar('Seleccione una opción: ');
    opcion = Number.parseInt(respuesta, 10);

    switch (opcion) {
      case 1:
        mostrarLista(verTareas(tareas, 'todas'));
        break;
      case 2:
        await crearTareaDesdePrompt(new Date());
        break;
      case 3:
        await buscarTareaDesdePrompt();
        break;
      case 4:
        console.log('Saliendo del programa...');
        rl.close();
        break;
      default:
        console.log('Opción inválida, por favor seleccione una opción válida.');
    }
  } while (opcion !== 4);
}

menu().catch((error) => {
  console.error('Ocurrió un error:', error);
  rl.close();
});