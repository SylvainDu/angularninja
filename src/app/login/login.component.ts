import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    login: '',
    password: ''
  };
  authenticationFailed: boolean = false;

  constructor(fm: FormsModule, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  authenticate() {
    console.log(this.credentials);
    
    this.userService.authenticate(this.credentials).subscribe(
      () => this.router.navigate(['/']),
      () => this.authenticationFailed = true
    )
  }
}