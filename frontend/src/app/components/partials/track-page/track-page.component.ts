import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
})
export class TrackPageComponent {
  order!: any;
  count:number=1
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params['orderId'];
  
    if (!params) return;

    orderService.trackOrderDetails(params).subscribe((order) => {
      this.order = order.order;
    });
  }
}
