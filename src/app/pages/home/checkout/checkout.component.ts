import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  change: boolean = false;
  user!: User;
  total!: number;

  profileForm = new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  })

  order: Order = {
    delivery_address: "",
    user_id: "",
    total:0,
    items: []
  }

  constructor(
    private authService: AuthService, private cartService: CartService, 
    private orderService: OrderService, private router: Router
  ) { }

  ngOnInit() {
    this.total = this.cartService.getTotal()
    this.authService.profile().subscribe((data: any) => {
      this.user = data;
      this.change = false;

      this.profileForm.patchValue({
        name: this.user.name, phone: this.user.phone, address: this.user.address
      })
    })
  }

  onSubmit() {
    this.authService.update(this.profileForm.value).subscribe((data: any) => {
      this.ngOnInit();
    })
  }

  completeOrder(){
    this.order.delivery_address = this.profileForm.value.address || '-';
    this.order.user_id = sessionStorage.getItem("id") || '';
    this.order.total = this.total;
    this.order.items = this.orderService.getCartItems();

    this.orderService.create(this.order).subscribe((data: any) => {
      localStorage.removeItem("cart");
      this.router.navigate(['/history']);
    })
  }

  update_change() {
    this.change = true;
  }
}
