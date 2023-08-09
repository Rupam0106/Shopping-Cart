import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
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
      }
    });
  }
}
