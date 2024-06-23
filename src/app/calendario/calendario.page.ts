import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  fecha: string = '';
  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
    this.filtrarTareas();
  }

  onDateChange(event: any) {
    this.fecha = event.detail.value;
    this.filtrarTareas();
  }

  filtrarTareas() {
    this.tareasFiltradas = this.tareas.filter(t => t.fecha === this.fecha);
  }

  navegarAgregarTarea() {
    this.navCtrl.navigateForward('/tareas');
  }

  eliminarTarea(tarea: Tarea) {
    this.tareas = this.tareas.filter(t => t !== tarea);
    this.guardarTareas();
    this.filtrarTareas();
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }
}