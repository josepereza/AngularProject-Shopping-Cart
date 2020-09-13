import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;
  showSpinner: boolean;
  checkoutForm: any;


  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private  spinner: NgxSpinnerService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  onCheckout(): any {
    this.spinner.show();
    {
       this.cartService.CheckoutFromCart(1);
     }
    }
}
