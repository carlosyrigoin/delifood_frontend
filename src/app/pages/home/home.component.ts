import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  showCategories: boolean = true;
  category: string = "";
  search!: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;

        data.forEach(element => {
          if(!this.categories.includes(element.category)){
            this.categories.push(element.category);
          }
        });
      },
      error: () => {
        this.products = [];
      },
    });
  }

  filter(){
    this.category = "";
    this.filteredProducts = this.products.filter((product: Product) =>{
      const regex = new RegExp(this.search.toLowerCase())
      return regex.test(product.name.toLowerCase())
    })
    this.showCategories = this.filteredProducts.length === this.products.length
  }

  filterByCategory(category: string){
    this.category = category;
    this.filteredProducts = this.products.filter((product: Product) => category === product.category)
  }

  filterReset(){
    this.search = "";
    this.filter();
  }
}
