import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
    this.orderId = this.router.snapshot.paramMap.get('orderId');
    if (this.orderId) {
      this.orderService.getSpecificOrderDetails(this.orderId).subscribe();
      this.orderService.getOrderData().subscribe((data: any) => {
        if (data.order) {
          this.orderDetail = data.order;
        }
      });
    }
  }

  cancelItem(id: string) {
    this.orderService.cancelOrderItem(this.orderId, id).subscribe();
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data.order) {
        this.orderDetail = data.order;
      }
    });
  }

  orderCancel(id: string) {
    this.orderService.cancelOrder(id).subscribe();
    this.orderService.getOrderData().subscribe((data: any) => {
      if (data.order) {
        this.orderDetail = data.order;
        this.toastr.success(data.msg);
      }
    });
  }
}
