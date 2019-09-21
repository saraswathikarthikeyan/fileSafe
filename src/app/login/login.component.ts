import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Login } from '../model/user';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AutologoutService} from '../services/autologout.service';

import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFG: FormGroup;
  loginModel: Login;
  errorMessage:string;
  returnUrl: string;

  constructor(private loginFB: FormBuilder,
    private loginService: LoginService, private router: Router, private autologout: AutologoutService ) {       
      this.createLoginForm();
    }

  ngOnInit() {
    this.returnUrl = '/fileupload';
    //this.authService.logout();
  }

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required':      'User Name is required.',
      'minlength':     'User Name must be at least 2 characters long.',
      'maxlength':     'User cannot be more than 25 characters long.'
    },
    'password': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    }
  };

  createLoginForm(): void{
    this.loginFG = this.loginFB.group ({
      username : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });
  }

  onSubmit(){
    this.loginModel = this.loginFG.value;

    if(this.loginFG.valid)
    {
      console.log(this.loginModel);

      if(this.loginModel.username === "saraswathi" && this.loginModel.password === "test")
      {
        console.log('yes');
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.loginModel.username);
        this.autologout.init();

        this.router.navigate([this.returnUrl]);
      }
      else {
        this.errorMessage = "Incorrrect username or password";
      }
    }

  }

}
