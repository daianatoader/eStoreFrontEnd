import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Client }        from './client';
import { ClientService } from './client.service';


@Component({
    selector: 'client-detail',
    templateUrl: './client-detail.component.html',
    styleUrls: [ './client-detail.component.css' ]
})
export class ClientDetailComponent implements OnInit {
    client: Client;

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.clientService.getClient(+params.get('id')))
            .subscribe(client => this.client = client);
    }

    save(): void {
        this.clientService.update(this.client)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}
