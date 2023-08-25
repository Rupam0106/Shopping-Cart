import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  productData: undefined | any;
  productImage: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private product: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProductById(productId).subscribe((data: any) => {
        this.productData = data.product;
      });
  }
//  onFileSelected(event: any) {
//     if (event.target.files.length > 0) {
//       this.productImage = event.target.files[0];
//     }
//   }

  updateProductByAdmin(data: any) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    this.product.updateProduct(this.productData._id,formData).subscribe(res=>{
     this.toastr.success("Product Updated Successfully","Product !")
     this.router.navigateByUrl('/admin/home')
    });
  }
}
