import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarea } from '../models/tarea';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tareas: Tarea[] = [];

  constructor(private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.obtenerTareas();
  }

  obtenerTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
      this.tareas = JSON.parse(tareasGuardadas);
    }
  }

  navegarAgregarTarea() {
    this.navCtrl.navigateForward('/tareas');
  }

  eliminarTarea(tarea: Tarea) {
    this.tareas = this.tareas.filter(t => t !== tarea);
    this.guardarTareas();
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  reordenarTareas(event: any) {
  const itemMover = this.tareas.splice(event.detail.from, 1)[0];
  this.tareas.splice(event.detail.to, 0, itemMover);
  event.detail.complete();
  this.guardarTareas();
}
}