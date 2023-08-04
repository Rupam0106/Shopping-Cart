import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  Products: undefined | Product[]
  constructor(private productService: ProductsService) {}

  ngOnInit() {
   this.productService.getAllProduct().subscribe((data:any)=>{
    this.Products=data.products
   })
  }

}
