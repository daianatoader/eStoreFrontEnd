import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Order} from './order';
import {OrderService} from './order.service';
import {Product} from "../product/product";


@Component({
  selector: 'my-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: Order[];
  selectedProduct: Product;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) {
    this.orders = [];
   orderService.getOpenOrderForClient(1).then(order => this.orders.push(order));
  }

  ngOnInit(): void {}

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  gotoDetail(): void {
    // this.router.navigate(['/productDetail', this.selectedProduct.id]);
  }
}
