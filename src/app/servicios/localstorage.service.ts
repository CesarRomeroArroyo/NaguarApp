import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  constructor() { }

  obtener (key: string) {
    return localStorage.getItem(key);
  }

  agregar ( key: string, data: any ) {
    return localStorage.setItem(key, data);
  }

  eliminar (key: string) {
    return localStorage.removeItem(key);
  }

}
