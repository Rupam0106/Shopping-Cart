import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent {
  constructor(
    private ActivatedRouter: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService,
    private paymentService:PaymentService
  ) {}
  notFound: boolean = false;
  orderDetail: any;
  orderId: any;
  cancelbtn: boolean = false;

  ngOnInit(): void {
    this.orderId = this.ActivatedRouter.snapshot.paramMap.get('orderId');
    if (this.orderId) {
      this.orderService
        .getSpecificOrderDetails(this.orderId)
        .subscribe((data: any) => {
          if (data) {
            this.orderDetail = data.order;
            console.log(data.order.status);
            if (data.order.status == 'cancled') {
              this.cancelbtn = true;
            }else{
              this.cancelbtn = false;
            }
          }
        });
    }
  }

  cancelItem(id: string) {
    this.orderService
      .cancelOrderItem(this.orderId, id)
      .subscribe((data: any) => {
        if (data) {
          this.orderDetail = data.order;
          this.toastr.success(data.msg);
        }
      });
  }

  orderCancel(id: any) {
 
    this.orderService.cancelOrder(id).subscribe((data: any) => {
      if (data) {
        this.orderDetail = data.order;
        this.toastr.success(data.msg);
           this.sendMail(id);
      }
    });
  }

  sendMail(id: any) {
    this.paymentService.orderDetailsMail(id).subscribe();
  }
}
