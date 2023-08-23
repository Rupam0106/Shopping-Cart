import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { states } from 'src/app/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  paymentHandler: any;
  cartItems: any[] = [];
  constructor(private router: Router) {}
  cartDetails: any;
  states: string[] = states;

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
    } else {
      this.router.navigate(['/login']);
    }
    let cart = localStorage.getItem('cart');
    if (cart) {
      this.cartDetails = JSON.parse(cart);
      this.cartItems = this.cartDetails.cartItems;
      if (!this.cartDetails.cartItems.length) {
        this.router.navigate(['/user/order/checkout']);
      }
    } 
  }

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
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
}
