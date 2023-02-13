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

  getAllMembers() {
    return this.http.get(url + '/register/all');
  }

  // getExcelFile() {
  //   return this.http.get(url + '/register/excel', {responseType: "blob"});
  // }

  deleteMember(member) {
    return this.http.delete(url + '/register/' + member.id);
  }

  updateMember(member) {
    return this.http.put(url + '/register/', member);
  }
}
