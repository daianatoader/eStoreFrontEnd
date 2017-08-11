import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {Admin} from './admin';
import {AdminService} from './admin.service';

@Component({
    selector: 'admin-detail',
    templateUrl: './admin-detail.component.html',
    styleUrls: ['./admin-detail.component.css']
})
export class AdminDetailComponent implements OnInit {
    admin: Admin;

    constructor(private adminService: AdminService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.adminService.getAdmin(+params.get('id')))
            .subscribe(admin => this.admin = admin);
    }

    save(): void {
        this.adminService.update(this.admin)
            .then(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}