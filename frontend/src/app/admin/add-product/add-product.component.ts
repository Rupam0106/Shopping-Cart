import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productImage: string = '';
  constructor(private admin: AdminService) {}
  addProductByAdmin(data: any) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('productImage', this.productImage);
    formData.append('stock', data.stock);
    this.admin.addProduct(formData).subscribe();
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.productImage = event.target.files[0];
    }
  }
}
