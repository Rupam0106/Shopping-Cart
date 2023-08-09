import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  ) {}
  orderDetail: any;
  orderId: any;

  ngOnInit(): void {
    this.orderId = this.router.snapshot.paramMap.get('orderId');
    if (this.orderId) {
      this.orderService
        .getSpecificOrderDetails(this.orderId)
        .subscribe((data: any) => {
          if (data.order) {
            this.orderDetail = data.order;
          }
        });
    }
  }

  cancelItem(id: string) {
    this.orderService.cancelOrderItem(this.orderId, id).subscribe();
  }

  orderCancel(id: string) {
    this.orderService.cancelOrder(id).subscribe();
  }
}
