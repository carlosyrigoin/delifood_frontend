import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  getCartItems() {
    let Products: Product[] = []
    let cartItems = JSON.parse(localStorage.getItem("cart")!)
    return cartItems || Products
  }

  addItemToCart(item: Product) {
    console.log("AddItem")
    if (this.isItemAddedToCart(item._id)) {
      return
    }
    let cartItems = JSON.parse(localStorage.getItem("cart")!) || []
    cartItems.push({ ...item, quantity: 1 })
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }

  removeItemFromCart(id: String) {
    let cartItems = JSON.parse(localStorage.getItem("cart")!)
    cartItems = cartItems.filter((item: Product) => item._id !== id)
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }

  isItemAddedToCart(id: String) {
    let cartItems = JSON.parse(localStorage.getItem("cart")!)
    return (cartItems?.filter((item: Product) => item._id === id).length > 0)
  }

  updateCart(cart: Product[]) {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  getTotal() {
    let cartItems = JSON.parse(localStorage.getItem("cart")!)
    return cartItems.reduce((acc: number, cur: Product) => acc + (cur.price * (cur.quantity || 0)), 0)
  }
}
