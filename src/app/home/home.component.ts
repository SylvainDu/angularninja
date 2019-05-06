import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userEventSubs: Subscription;
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userEventSubs = this.userService.userEvents.subscribe(user => this.user = user)
  }

  ngOnDestroy(): void {
    if ( this.userEventSubs) {
      this.userEventSubs.unsubscribe();
    }
   }

}
