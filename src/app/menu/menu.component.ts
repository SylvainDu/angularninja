import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  navbarCollapsed = true;
  user: UserModel;
  userEventSubs: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userEventSubs = this.userService.userEvents.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
      if ( this.userEventSubs) {
        this.userEventSubs.unsubscribe();
      }
     }

  toggleNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;    
  }

  logout(event: any) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
