import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alertController: AlertController, 
    private navCtrl: NavController
  ) {}

  async login() {
    const isLoggedIn = await this.authService.login(this.username, this.password);
    if (isLoggedIn) {
      this.navCtrl.navigateRoot('/home');
    } else {
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Usuario o contraseña inválida',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async register() {
    await this.authService.register(this.username, this.password);
    const alert = await this.alertController.create({
      header: 'Registration Successful',
      message: 'Usuario registrado con éxito',
      buttons: ['OK']
    });
    await alert.present();
  }
}