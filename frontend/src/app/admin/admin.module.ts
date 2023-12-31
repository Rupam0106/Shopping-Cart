import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [AddProductComponent, UpdateProductComponent, AdminHomeComponent, AdminOrdersComponent],
  exports: [AddProductComponent, UpdateProductComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule],
})
export class AdminModule {}
