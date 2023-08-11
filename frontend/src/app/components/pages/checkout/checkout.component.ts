import { PaymentService } from './../../../services/payment.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import {
  LOCATE,
  PUBLISHABLE_KEY,
  SCRIPT,
  SCRIPT_ID,
  SCRIPT_SRC,
  SCRIPT_TYPE,
  STRIPE_SCRIPT,
} from 'src/app/shared/constants/urls';
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
    private userService: UserService,
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService
  ) {}
  cartDetails: any;
  states: string[] = states;

  ngOnInit(): void {
    this.invokeStripe();
    const user = this.userService.currentUser;
    console.log(user.success);
    if (user.success) {
    } else {
      this.router.navigate(['/login']);
    }
    const cart = this.cartService.getCart();
    this.cartDetails = cart;
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

  placeOrder(amount: any) {
    if (this.form.errors) {
      return;
    } else {
      this.orderService.orderPlace(this.form.value).subscribe();
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: PUBLISHABLE_KEY,
        locale: LOCATE,
        token: function (stripeToken: any) {
          paymentStripe(stripeToken);
          this.router.navigate(['/orders']);
        },
      });

      const paymentStripe = (stripeToken: any) => {
        this.paymentService.makePayment(stripeToken).subscribe((data: any) => {
          console.log(data);
        });
      };

      paymentHandler.open({
        name: 'Welcome to R-Shop',
        description: 'A E-commerce Site',
        amount: amount * 100,
      });
    }
  }

  invokeStripe() {
    if (!window.document.getElementById(STRIPE_SCRIPT)) {
      const script = window.document.createElement(SCRIPT);
      script.id = SCRIPT_ID;
      script.type = SCRIPT_TYPE;
      script.src = SCRIPT_SRC;
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: PUBLISHABLE_KEY,
          locale: LOCATE,
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
