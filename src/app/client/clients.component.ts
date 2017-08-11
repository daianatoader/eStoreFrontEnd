import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Client }                from './client';
import { ClientService }         from './client.service';

@Component({
    selector: 'my-clients',
    templateUrl: './clients.component.html',
    styleUrls: [ './client.component.css' ]
})
export class ClientsComponent implements OnInit {
    clients: Client[];
    selectedClient: Client;

    constructor(
        private clientService: ClientService,
        private router: Router) { }

    getClients(): void {
        this.clientService
            .getClients()
            .then(clients => this.clients = clients);
    }

    add(username: string): void {
        username = username.trim();
        if (!username) { return; }
        this.clientService.create(username)
            .then(client => {
                this.clients.push(client);
                this.selectedClient = null;
            });
    }

    delete(client: Client): void {
        this.clientService
            .delete(client.id)
            .then(() => {
                this.clients = this.clients.filter(h => h !== client);
                if (this.selectedClient === client) { this.selectedClient = null; }
            });
    }

    ngOnInit(): void {
        this.getClients();
    }

    onSelect(client: Client): void {
        this.selectedClient = client;
    }

    gotoDetail(): void {
        this.router.navigate(['/clientDetail', this.selectedClient.id]);
    }
}
