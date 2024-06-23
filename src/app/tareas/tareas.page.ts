import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarea } from '../models/tarea';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage {
  numero: number = 1;
  nombre: string = '';
  descripcion: string = '';
  fecha: string = new Date().toISOString();
  icono: string = 'icono-casa.png';
  mostrarCorazones: boolean = false;
  audio: HTMLAudioElement

  constructor(private navCtrl: NavController, private platform: Platform) {  this.audio = new Audio();
    this.audio.src = 'assets/audios/notificacion_positiva.mp3';}

    async agregarTarea() {
      const nuevaTarea = new Tarea(this.numero, this.nombre, this.descripcion, this.fecha, this.icono);
      const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
      tareasGuardadas.push(nuevaTarea);
      localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));
    
   
      this.mostrarCorazones = true;
      this.reproducirNotificacion();
      await this.delay(2000);
      this.navCtrl.back();
    }
    
    async reproducirNotificacion() {
      try {
        await this.audio.play();
      } catch (err) {
        console.error('Error al reproducir el sonido:', err);
      }
    }
    
    delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    }