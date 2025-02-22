import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _Router:Router ,private _HttpClient: HttpClient) {
    if (localStorage.getItem('userData')) {
      this.loginStatus.next(true)
      this._Router.navigate(['/home'])
    }
  }


  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)


  getUsers():Observable<any>{
    return this._HttpClient.get('https://fabric-server.onrender.com/signup')
  }



  addUser(data: any): Observable<any>{
    return this._HttpClient.post('https://fabric-server.onrender.com/signup' , data)
  }

}
