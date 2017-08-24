import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Order} from './order';
import {OrderService} from './order.service';


@Component({
  selector: 'my-orders',
  templateUrl: './shoppingCart.component.html',
  styleUrls: ['./shoppingCart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  order: Order;
  selectedOrder: Order;

  constructor(private orderService: OrderService,
              private router: Router) {
  }

  getOrders(): void {
    this.orderService
      .getOpenOrderForClient(1)
      .then(order => this.order = order);
  }

  ngOnInit(): void {
    this.getOrders();
    console.error(this.order);
  }

  onSelect(order: Order): void {
    this.selectedOrder = order;
  }

  gotoDetail(): void {
    this.router.navigate(['/orderDetail', this.selectedOrder.id]);
  }
}
