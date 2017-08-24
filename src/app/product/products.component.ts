import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Product} from './product';
import {Client} from '../client/client';
import {Order} from '../order/order';
import {ProductService} from './product.service';
import {ClientService} from '../client/client.service';
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
    client: Client;

    constructor(private productService: ProductService,
                private clientService: ClientService,
                private orderService: OrderService,
                private router: Router) {
                    orderService.getOrders().then(o => this.orders = o);   
                    clientService.getClient(1).then(c=>this.client=c);        
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

    addToCart(client: Client,product: Product): void {
        client=this.client;
        var clientOrder = this.orders.find(function(el){
            return el.client.id===client.id &&
            el.orderStatus==='OPEN';
        });

        if(clientOrder!=undefined){//UPDATE COMANDA
            clientOrder.products.push(product);
            clientOrder.price+=product.price;
            this.orderService.update(clientOrder);
        }
        else{//CREARE COMANDA DACA NU EXISTA O COMANDA CU STATUS-UL OPEN
            var order= new Order();
            order.products = new Array();
            order.price=0;
            order.price+=product.price;
            order.orderStatus='OPEN';
            order.client=client;
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

