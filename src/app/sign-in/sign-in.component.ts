import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserSignIn } from '../Model/userSignin.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  invalidSignIn: boolean = false;

  onSubmit(form: NgForm) {
    this.invalidSignIn = false;
    var loginUser = new UserSignIn(form);
    this.authService.signIn(loginUser.email, loginUser.password).catch(() => {
      this.invalidSignIn = true;
      form.reset();
    });
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
