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
    const storedUsername = await this.storage.get('username');
    const storedPassword = await this.storage.get('password');
    
    if (username === storedUsername && password === storedPassword) {
      await this.storage.set('isLoggedIn', true);
      return true;
    } else {
      return false;
    }
  }

  async register(username: string, password: string): Promise<void> {
    await this.storage.set('username', username);
    await this.storage.set('password', password);
  }

  async logout(): Promise<void> {
    await this.storage.set('isLoggedIn', false);
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.storage.get('isLoggedIn') === true;
  }
}