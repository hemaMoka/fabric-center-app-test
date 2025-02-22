import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }


  getProducts(): Observable<any>{
    return this._HttpClient.get('https://fabric-server.onrender.com/products')
  }


  getSingleProduct(id:any): Observable<any>{
    return this._HttpClient.get(`https://fabric-server.onrender.com/products/${id}`)
  }



  addProductToCard(data: any): Observable<any>{
    return this._HttpClient.post('https://fabric-server.onrender.com/card' , data)
  }



  getUserCard(user_id:any): Observable<any>{
    return this._HttpClient.get(`https://fabric-server.onrender.com/card?user_id=${user_id}`)
  }

  deleteUserCard(card_id: any): Observable<any>{
    return this._HttpClient.delete(`https://fabric-server.onrender.com/card/${card_id}`)
  }
}
