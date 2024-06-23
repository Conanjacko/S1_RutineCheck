export class Tarea {
  numero: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  icono: string;
  completada: boolean;

  constructor(numero: number, nombre: string, descripcion: string, fecha: string, icono: string, completada: boolean = false) {
    this.numero = numero;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.icono = icono;
    this.completada = completada;
  }
}