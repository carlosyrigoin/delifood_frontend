import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  product: Product = {
    _id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
    picture_url: ""
  }
  productId!: string | null;
  isAddCart!: boolean;
  labelBtn:string = this.isAddCart ? "Added to cart" : "Add to cart";

  constructor(
    private productService: ProductService, private cartService: CartService, 
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id')
      if (this.productId) {
        this.productService.get(this.productId).subscribe((data:any) =>{
          this.product = data;
          this.isAddCart = this.cartService.isItemAddedToCart(this.product._id);
          this.labelBtn = this.isAddCart ? "Added to cart" : "Add to cart";
        })
      }
    })
  }

  onClick() {
    this.cartService.addItemToCart(this.product);
    console.log("Agregado al carrito");
    this.router.navigate(['/home/cart']);
  }
}
