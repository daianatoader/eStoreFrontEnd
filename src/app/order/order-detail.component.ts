import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {Order} from './order';
import {OrderService} from './order.service';

@Component({
    selector: 'order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: [ './order-detail.component.css' ]
})
export class OrderDetailComponent implements OnInit {
    order: Order;

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private location: Location
    ) {}
    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.orderService.getOrder(+params.get('id')))
            .subscribe(order => this.order = order);
    }

  goBack(): void {
    this.location.back();
  }

  cancelOrder(): void {
    if (this.order.orderStatus === 'OPEN' || this.order.orderStatus === 'SHIPPED') {
        this.orderService.update(this.order.id)
          .then(() => this.goBack());
      } else {
        alert('This order can not be canceled!!');
      }
  }
}
