import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Admin} from './admin';
import {AdminService} from './admin.service';

@Component({
    selector: 'my-admins',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminsComponent implements OnInit {
    admins: Admin[];
    selectedAdmin: Admin;

    constructor(private adminService: AdminService,
                private router: Router) {
    }

    getAdmins(): void {
        this.adminService
            .getAdmins()
            .then(admins => this.admins = admins);
    }

    add(username: string): void {
        username = username.trim();
        if (!username) {
            return;
        }
        this.adminService.create(username)
            .then(admin => {
                this.admins.push(admin);
                this.selectedAdmin = null;
            });
    }

    delete(admin: Admin): void {
        this.adminService
            .delete(admin.id)
            .then(() => {
                this.admins = this.admins.filter(h => h !== admin);
                if (this.selectedAdmin === admin) {
                    this.selectedAdmin = null;
                }
            });
    }

    ngOnInit(): void {
        this.getAdmins();
    }

    onSelect(admin: Admin): void {
        this.selectedAdmin = admin;
    }

    gotoDetail(): void {
        this.router.navigate(['/adminDetail', this.selectedAdmin.id]);
    }
}