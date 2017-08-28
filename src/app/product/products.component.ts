import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Product} from './product';
import {User} from '../user/user';
import {Order} from '../order/order';
import {ProductService} from './product.service';
import {UserService} from '../user/user.service';
import {OrderService} from '../order/order.service';

@Component({
    selector: 'my-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[];
    selectedProduct: Product;
    order:Order;
    orders:Order[];
    user: User;
    currentUser: User;

    constructor(private productService: ProductService,
                private userService: UserService,
                private orderService: OrderService,
                private router: Router) {
                    orderService.getOrders().then(o => this.orders = o);
                    userService.getUser(1).then(c=>this.user=c);
                    this.currentUser = userService.getLoggedInUser();

    }

    getProducts(): void {
        this.productService
            .getProducts()
            .then(products => this.products = products);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.productService.create(name)
            .then(product => {
                this.products.push(product);
                this.selectedProduct = null;
            });
    }

    delete(product: Product): void {
        this.productService
            .delete(product.id)
            .then(() => {
                this.products = this.products.filter(h => h !== product);
                if (this.selectedProduct === product) {
                    this.selectedProduct = null;
                }
            });
    }

    addToCart(user: User ,product: Product): void {
        user=this.user;
        var userOrder = this.orders.find(function(el){
            return el.user.id===user.id &&
            el.orderStatus==='OPEN';
        });

        if(userOrder!=undefined){//UPDATE COMANDA
            userOrder.products.push(product);
            userOrder.price+=product.price;
            this.orderService.update(userOrder);
        }
        else{//CREARE COMANDA DACA NU EXISTA O COMANDA CU STATUS-UL OPEN
            var order= new Order();
            order.products = new Array();
            order.price=0;
            order.price+=product.price;
            order.orderStatus='OPEN';
            order.user=user;
            console.log(order.products);
            console.log(product);
            order.products.push(product);
            this.orderService.create(order);
        }
    }

    ngOnInit(): void {
        this.getProducts();
    }

    onSelect(product: Product): void {
        this.selectedProduct = product;
    }

    gotoDetail(): void {
        this.router.navigate(['/productDetail', this.selectedProduct.id]);
    }
}

