import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _HttpClient=inject(HttpClient);
   private readonly _Router=inject(Router);


usedata:any=null;


setregister(data: object): Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
}

setlogin(data: object): Observable<any> {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
}

setlogout(): void {
  localStorage.removeItem('usertoken');
  this.usedata = null;
  this._Router.navigate(['/auth/login']);
}

saveuserdata(): void {
if(localStorage.getItem('usertoken') !== null){
  this.usedata = jwtDecode(localStorage.getItem('usertoken')!);
  console.log('usedata', this.usedata);
}
}
}
