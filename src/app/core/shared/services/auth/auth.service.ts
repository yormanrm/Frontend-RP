import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost/Backend_RP/api php/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email:string, passwd:string):Observable<any>{
    return this.http.post(AUTH_API + 'login', {email, passwd}, httpOptions);
  }

}