import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUri: string = "https://delifoodbackend-production.up.railway.app/api"

  constructor(
    private http: HttpClient,
  ) { }

  getAll(){
    return this.http.get<Order[]>(`${this.apiUri}/orders/${sessionStorage.getItem("id")}`)
  }

  create(data: any) {
    return this.http.post(`${this.apiUri}/orders`, data)
  }

  getCartItems() {
    let items:any = [];
    let cartItems = JSON.parse(localStorage.getItem("cart")!)
    for (let i = 0; i < cartItems.length; i++) {
      items.push({ id: cartItems[i]["_id"], quantity: cartItems[i]["quantity"], description: cartItems[i]["name"], price: cartItems[i]["price"] })
    }
    return items
  }
}
