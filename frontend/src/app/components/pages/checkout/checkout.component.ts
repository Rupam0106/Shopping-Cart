import { PaymentService } from './../../../services/payment.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

import { states } from 'src/app/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  paymentHandler: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}
  cartDetails: any;
  states: string[] = states;

  ngOnInit(): void {
    // this.invokeStripe();

    if (localStorage.getItem('token')) {
    } else {
      this.router.navigate(['/login']);
    }
    this.cartService.getCartData().subscribe((data) => {
      this.cartDetails = data;
    });
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[6-9]{1}[0-9]{9}$'),
    ]),
    house: new FormControl('', [Validators.required, Validators.minLength(2)]),
    street: new FormControl('', [Validators.required, Validators.minLength(6)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    state: new FormControl('', [Validators.required, Validators.minLength(3)]),
    pincode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get house() {
    return this.form.get('house');
  }
  get street() {
    return this.form.get('street');
  }
  get city() {
    return this.form.get('city');
  }
  get state() {
    return this.form.get('state');
  }
  get pincode() {
    return this.form.get('pincode');
  }

  placeOrder() {
    if (this.form.errors) {
      return;
    } else {
      this.orderService.orderPlace(this.form.value).subscribe((data: any) => {
        if (data) {
          localStorage.removeItem('cart');
          this.cartService.getUserCart();
          this.toastr.success(data.msg);
          setTimeout(() => {
            this.router.navigate(['/user/order']);
          }, 1500);
        }
      });
    }
  }
}
