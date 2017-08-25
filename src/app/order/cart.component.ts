import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Order} from './order';
import {OrderService} from './order.service';
import {Product} from "../product/product";
import {ProductService} from "../product/product.service";


@Component({
  selector: 'my-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orders: Order[];
  selectedProduct: Product;

  constructor(private orderService: OrderService,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router) {
    this.getOpenOrder();
  }

  private getOpenOrder() {
    this.orders = [];
    this.orderService.getOpenOrderForClient(1).then(order => this.orders.push(order));
  }

  ngOnInit(): void {}

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  removeFromCart(product: Product): void {
    if (this.orders.length >= 1) {
      this.orders[0].products = this.orders[0].products.filter(p => p.id !== product.id);
      this.orderService.update(this.orders[0]);
      this.getOpenOrder();
      location.reload();
    }
  }

  emptyCart(): void {
    if (this.orders.length >= 1) {
      this.orders[0].products = [];
      this.orderService.update(this.orders[0]);
      this.getOpenOrder();
      location.reload();
    }
  }

}
