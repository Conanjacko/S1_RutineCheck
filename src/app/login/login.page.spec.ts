import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './login.page';
import { AuthService } from '../auth.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthService;
  let navCtrl: NavController;
  let alertController: AlertController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        RouterModule.forRoot([]), 
        HttpClientModule
      ],
      providers: [
        AuthService,
        AlertController,
        NavController
      ]
    }).compileComponents();
    
    authService = TestBed.inject(AuthService);
    navCtrl = TestBed.inject(NavController);
    alertController = TestBed.inject(AlertController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login on login', async () => {
    spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    component.username = 'test';
    component.password = 'password';
    await component.login();
    expect(authService.login).toHaveBeenCalledWith('test', 'password');
  });

  it('should navigate to home on successful login', async () => {
    spyOn(authService, 'login').and.returnValue(Promise.resolve(true));
    spyOn(navCtrl, 'navigateRoot');
    component.username = 'test';
    component.password = 'password';
    await component.login();
    expect(navCtrl.navigateRoot).toHaveBeenCalledWith('/home');
  });

  it('should show an alert on failed login', async () => {
    spyOn(authService, 'login').and.returnValue(Promise.resolve(false));
    const alertMock = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    spyOn(alertController, 'create').and.returnValue(Promise.resolve(alertMock));
    component.username = 'test';
    component.password = 'password';
    await component.login();
    expect(alertController.create).toHaveBeenCalledWith({
      header: 'Login Failed',
      message: 'Usuario o contraseña inválida',
      buttons: ['OK']
    });
    expect(alertMock.present).toHaveBeenCalled();
  });
});