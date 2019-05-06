import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl , Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  registrationFailed: boolean = false;

  static passwordMatch(group: FormGroup) {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  constructor(fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = fb.control('', Validators.required);
    this.confirmPasswordCtrl = fb.control('', Validators.required);
    this.birthYearCtrl = fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);

    this.passwordForm = fb.group(
      { password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl },
      { validators: RegisterComponent.passwordMatch }
    )

    this.userForm = fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    })
   }

  ngOnInit() {
  }

  register() {
    const login = this.userForm.get('login').value;
    const password = this.userForm.get('passwordForm').value.password;
    const birthDate = this.userForm.get('birthYear').value;
    
    this.userService.register(login, password, birthDate).subscribe(
      () => this.router.navigate(['/']),
      () => this.registrationFailed = true
    );
    
  }

}
