import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async login(username: string, password: string): Promise<boolean> {
    const storedUsername = await this._storage?.get('username');
    const storedPassword = await this._storage?.get('password');
    
    if (username === storedUsername && password === storedPassword) {
      await this._storage?.set('isLoggedIn', true);
      return true;
    } else {
      return false;
    }
  }

  async register(username: string, password: string): Promise<void> {
    await this._storage?.set('username', username);
    await this._storage?.set('password', password);
  }

  async logout(): Promise<void> {
    await this._storage?.set('isLoggedIn', false);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this._storage?.get('isLoggedIn') === true;
  }
}