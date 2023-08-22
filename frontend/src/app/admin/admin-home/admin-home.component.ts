import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  productList: undefined | any[];
  productMessage: undefined | string;
  constructor(private product: ProductsService, private toastr: ToastrService) {}

  ngOnInit() {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((response: any) => {
      if (response) {
        this.toastr.success('Product Deleted Successfully');
        this.list();
      }
    });
  }

  list() {
    this.product.getAllProduct().subscribe((result: any) => {
      if (result) {
        this.productList = result.products;
      }
    });
  }
}
