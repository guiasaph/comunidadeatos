import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../app/configUrl';

@Injectable({
  providedIn: 'root'
})
export class CadastrarMembroService {

  constructor(private http: HttpClient) { }

  postNewUser(user: any) {
    return this.http.post(url + '/register/create', user);
  }

  getAllMembers(token) {
    return this.http.get(url + '/register/all', { headers: { authorization: token}}); //feito assim por um problema do local storage
  }

  deleteMember(member) {
    return this.http.delete(url + '/register/' + member.id, header);
  }

  updateMember(member) {
    return this.http.put(url + '/register/', member, header);
  }
}

const header = { headers: { authorization: window.localStorage.getItem('bearer')}};
