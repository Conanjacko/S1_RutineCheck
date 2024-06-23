import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate(500)
      ]),
    ])
  ]
})
export class BienvenidaPage implements OnInit {
  mostrarLogo: boolean = true;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    setTimeout(() => {
      this.mostrarLogo = false;
      setTimeout(() => {
        this.navCtrl.navigateForward('/login');
      }, 500);
    }, 3000); 
  }
}
