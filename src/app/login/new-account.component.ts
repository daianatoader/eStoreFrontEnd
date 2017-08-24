import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {User} from '../user/user'
@Component({
    selector: 'new-account',
    templateUrl: './new-account.component.html',
    styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent{
    user: User;
 
    constructor(private authentificationService: AuthenticationService,
                private router: Router) {
             this.user = new User();
    }
    
    createAccount(): void {
        this.authentificationService.create(this.user);
        this.router.navigate(['login']);
      }
}