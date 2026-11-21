export declare const Estados: Readonly<{
    readonly pendiente: 'pendiente';
    readonly en_curso: 'en_curso';
    readonly terminada: 'terminada';
    readonly cancelada: 'cancelada';
}>;
export declare const Dificultades: Readonly<{
    readonly facil: 'facil';
    readonly medio: 'medio';
    readonly dificil: 'dificil';
}>;
export type EstadoTarea = typeof Estados[keyof typeof Estados];
export type DificultadTarea = typeof Dificultades[keyof typeof Dificultades];
export type FiltroTarea = 'todas' | EstadoTarea;
export interface Tarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: EstadoTarea;
    fechaCreacion: Date;
    ultimaEdicion: Date;
    fechaVencimiento: Date | undefined;
    dificultad: DificultadTarea;
}
export type TareaInput = {
    id?: string | undefined;
    titulo: string;
    descripcion?: string | undefined;
    estado?: EstadoTarea | string | undefined;
    fechaCreacion?: Date | undefined;
    ultimaEdicion?: Date | undefined;
    fechaVencimiento?: Date | undefined;
    dificultad?: DificultadTarea | string | undefined;
};
export type TareaUpdate = Partial<Pick<Tarea, 'descripcion' | 'estado' | 'dificultad' | 'fechaVencimiento' | 'ultimaEdicion'>> & {
    fechaVencimiento?: Date | undefined;
    ultimaEdicion?: Date | undefined;
};
//# sourceMappingURL=tarea.d.ts.map