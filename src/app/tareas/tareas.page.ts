import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage {
  numero: number = 0;
  nombre: string = '';
  descripcion: string = '';

  constructor(private navCtrl: NavController) {}

  agregarTarea() {
    const nuevaTarea = new Tarea(this.numero, this.nombre, this.descripcion);
    let tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    this.navCtrl.navigateBack('/home');
  }
}