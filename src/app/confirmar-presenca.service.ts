import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../app/configUrl';

@Injectable({
  providedIn: 'root'
})
export class ConfirmarPresencaService {

  constructor(private http: HttpClient) { }

  public nomes = [];

  registerNameInDataBase(pessoa: any) {
    return this.http.post(`${url}/create`, {name: pessoa});
  }

  getAllRegister() {
    return this.http.get(`${url}/all`);
  }
}
