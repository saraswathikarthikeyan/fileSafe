import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { User } from '../model/user';
import { AuthGuard } from '../auth.guard';
import { LoginService} from '../services/login.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFG: FormGroup;
  loginModel: User;
  errorMessage:string;
  returnUrl: string = '/fileupload';

  constructor(private loginFB: FormBuilder, public router:Router,
    private authGuard: AuthGuard, private loginService: LoginService,private spinner: NgxSpinnerService ) {       
      this.authGuard.editLoginStatus('Login');
      //Method creates the Form
    }

  ngOnInit() {  
    this.createLoginForm();      
  }
  //Object contains the ErrorList for Form Controls
  formErrors = {
    'username': '',
    'password': ''
  };

  //Validation message for Form Controls
  validationMessages = {
    'username': {
      'required':      'User Name is required.',
      'minlength':     'User Name must be at least 2 characters long.',
      'maxlength':     'User cannot be more than 25 characters long.'
    },
    'password': {
      'required':      'Password is required.',
      'minlength':     'Password must be at least 2 characters long.',
      'maxlength':     'Password cannot be more than 25 characters long.'
    }
  };

  
  createLoginForm(): void{
    this.loginFG = this.loginFB.group ({
      username : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      password : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });

    this.loginFG.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  //Method triggers on Value changes and check for userInput
  onValueChanged(data?: any):void {

    if(!this.loginFG) {return}

    const form = this.loginFG;
    for (const field in this.formErrors)
    {
      if(this.formErrors.hasOwnProperty(field))
      {
          // clear previous error message (if any)
          this.formErrors[field] = '';

          //Gets the control
          const control = form.get(field);

          //check control is dirty or invalid
          if(control && control.dirty && !control.valid) {

            //Gets the validation error message
            const messages = this.validationMessages[field]; 
            for(const key in control.errors) {

              //checks for formErrors Property and assigns the message value
              if(control.errors.hasOwnProperty(key))
              {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }     
        }
      }      
    }

    //Method calls on user clicks the Login Button
  onSubmit():void{

    //Form group control value is assigned to the UserModel.
    this.loginModel = this.loginFG.value;

    //checks form is valid  
    if(this.loginFG.valid)
    {
      console.log(this.loginModel);

      this.errorMessage = "Processing..."

      //calls the service to validate the user controls
     //this.spinner.show();

     this.loginService.loginWithBackend(this.loginModel).subscribe((data => 
      { 
        //this.spinner.hide();
        if(data.success)
        { 
          //on Successfull login user is transferred to File upload page.
          this.errorMessage ="";          
          this.router.navigate([this.returnUrl]);
        }
        else{
          this.errorMessage = "Invalid User name or Password";
        }
      }
     ), (err) => { this.errorMessage = "Invalid User name or Password"; }
     );
      
    }
    else{
      //this.spinner.hide();
      this.errorMessage = "Invalid User name or Password";//sets error message when login model is Invalid
    }

  }

}
