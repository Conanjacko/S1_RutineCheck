export class Tarea {
    numero: number;
    nombre: string;
    descripcion: string;
    completada: boolean;
  
    constructor(numero: number, nombre: string, descripcion: string, completada: boolean = false) {
      this.numero = numero;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.completada = completada;
    }
  }
  