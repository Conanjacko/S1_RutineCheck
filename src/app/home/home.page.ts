import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Tarea } from '../models/tarea';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];
  fechaSeleccionada: string = new Date().toISOString();
  audio: HTMLAudioElement;

  constructor(private navCtrl: NavController, private renderer: Renderer2, private toastController: ToastController) {
    this.audio = new Audio('assets/audios/notificacion_negativa.mp3');
  }


  ionViewWillEnter() {
    this.obtenerTareas();
    this.filtrarTareasPorFecha();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.marcarDiasConTareas();
    }, 100);
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

  async confirmarEliminarTarea(tarea: Tarea) {
    this.reproducirNotificacionNegativa();
    const toast = await this.toastController.create({
      message: `¿Estás seguro de que quieres eliminar "${tarea.nombre}"?`,
      position: 'bottom',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado eliminar tarea');
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eliminarTarea(tarea);
          }
        }
      ]
    });
    await toast.present();
  }

  eliminarTarea(tarea: Tarea) {
    this.tareas = this.tareas.filter(t => t !== tarea);
    this.guardarTareas();
    this.filtrarTareasPorFecha();
    this.mostrarToastEliminacion();
  }

  async mostrarToastEliminacion() {
    const toast = await this.toastController.create({
      message: 'Tarea eliminada correctamente',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  reproducirNotificacionNegativa() {
    try {
      this.audio.currentTime = 0;
      this.audio.play();
    } catch (err) {
      console.error('Error al reproducir el sonido:', err);
    }
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  reordenarTareas(event: any) {
    const itemMover = this.tareas.splice(event.detail.from, 1)[0];
    this.tareas.splice(event.detail.to, 0, itemMover);
    event.detail.complete();
    this.guardarTareas();
    this.filtrarTareasPorFecha();
  }

  filtrarTareasPorFecha() {
    const fecha = new Date(this.fechaSeleccionada).toDateString();
    this.tareasFiltradas = this.tareas.filter(tarea => {
      const tareaFecha = new Date(tarea.fecha).toDateString();
      return tareaFecha === fecha;
    });
    this.marcarDiasConTareas();
  }

  marcarDiasConTareas() {
    const diasConTareas = this.getDaysWithTasks();
    const calendarEl = document.querySelector('ion-datetime');
    if (!calendarEl) return;

    setTimeout(() => {
      const shadowRoot = calendarEl.shadowRoot;
      if (!shadowRoot) return;

      const dayElements = shadowRoot.querySelectorAll('.calendar-day');
      dayElements.forEach(dayElement => {
        const date = dayElement.getAttribute('data-day');
        if (date && diasConTareas.includes(date)) {
          dayElement.classList.add('has-tareas');
        } else {
          dayElement.classList.remove('has-tareas');
        }
      });
    }, 100);
  }

  getDaysWithTasks(): string[] {
    return this.tareas.map(tarea => new Date(tarea.fecha).toISOString().split('T')[0]);
  }
}