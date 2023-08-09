import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  constructor(
    private orderService: OrderService,
  ) {}

  orders: any;

  getTime(input: string) {
    return new Date(input).toLocaleDateString();
  }
  ngOnInit(): void {
    this.orderService.getUserOrderDetails().subscribe((data: any) => {
      if (data) {
        this.orders = data.order;
        console.log(this.orders)
      }
    });
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data) {
        this.orders = data.order;
      }
    });
  }
}
