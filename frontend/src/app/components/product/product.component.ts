import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import {map} from 'rxjs/operators';
import {ProductModelServer} from '../../models/product.model';
import * as $ from 'jquery';
import * as slick from 'slick-carousel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: number;
  product;
  thumbimages: any[] = [];


  @ViewChild('quantity') quantityInput;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        if (prod.images !== null) {
          this.thumbimages = prod.images.split(';');
        }
      });
    });
  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {


    // Product Main img Slick
    ($('#product-main-img')as any).slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    ($('#product-imgs') as any).slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    const zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      ($('#product-main-img .product-preview')as any).zoom();
    }
  }

  addToCart(id: number): any {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase(): any {
    // tslint:disable-next-line: radix
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease(): any {
    // tslint:disable-next-line: radix
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}

