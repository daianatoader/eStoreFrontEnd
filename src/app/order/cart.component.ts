import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Order} from './order';
import {OrderService} from './order.service';


@Component({
  selector: 'my-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  order: Order;
  selectedOrder: Order;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.orderService.getOrder(1))
      .subscribe(o => this.order = o);
    console.log(this.order);
  }

  ngOnInit(): void {}

  onSelect(order: Order): void {
    this.selectedOrder = order;
  }

  gotoDetail(): void {
    this.router.navigate(['/orderDetail', this.selectedOrder.id]);
  }
}
