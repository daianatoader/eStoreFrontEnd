import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Order }                from './order';
import { OrderService }         from './order.service';

@Component({
    selector: 'my-orders',
    templateUrl: './orders.component.html',
    styleUrls: [ './order.component.css' ]
})
export class OrdersComponent implements OnInit {
    orders: Order[];
    selectedOrder: Order;

    constructor(
        private orderService: OrderService,
        private router: Router) { }

    getOrders(): void {
        this.orderService
            .getOrders()
            .then(orders => this.orders = orders);
    }
    ngOnInit(): void {
        this.getOrders();
    }

    onSelect(order: Order): void {
        this.selectedOrder = order;
    }

    gotoDetail(): void {
        this.router.navigate(['/orderDetails', this.selectedOrder.id]);
    }
}
