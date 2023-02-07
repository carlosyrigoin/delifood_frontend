import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  products: Product[] = []
  total!: number

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.products = this.cartService.getCartItems();
    this.total = this.cartService.getTotal()
  }

  reduceQuantity(product: Product) {
    if (product.quantity) {
      product.quantity -= 1
      if (product.quantity > 0) {
        this.cartService.updateCart(this.products)
        this.total = this.cartService.getTotal()
      } else {
        this.cartService.removeItemFromCart(product._id)
        this.ngOnInit()
      }
    }else{
      this.cartService.removeItemFromCart(product._id)
      this.ngOnInit()
    }
  }

  incrementQuantity(product: Product) {
    if (product.quantity) {
      product.quantity += 1
      this.total = this.cartService.getTotal()
    }
    this.cartService.updateCart(this.products)
  }
}
