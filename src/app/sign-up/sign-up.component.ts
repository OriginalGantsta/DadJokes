import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserSignup } from '../Model/userSignup.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
userSignup = new UserSignup (null,null,null,null)

  onSubmit(form: NgForm){
    this.userSignup.userForm = form;
    this.authService.signUp(this.userSignup)
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
