import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthGuard } from '../auth.guard';
import { AutologoutService } from '../services/autologout.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router:Router, private authGuard: AuthGuard, private autoLogout: AutologoutService ) { }

  logout(): void {
    sessionStorage.setItem('isLoggedIn', "false");
    sessionStorage.removeItem('token');
    this.router.navigate(['./login']);    
  }
  
  //Method called on Loin
  login(userModel:User): Boolean {

    if(userModel.username === "saraswathi" && userModel.password === "test")
      {
        console.log('yes');

        //this.authService.authLogin(this.model);
        this.authGuard.editLoginStatus('Logout');

        sessionStorage.setItem('isLoggedIn', "true");
        sessionStorage.setItem('token', userModel.username);

        console.log(sessionStorage.getItem('isLoggedIn'));

        //this.autoLogout.init();    
        return true;    
      }
      else {
        let errorMessage = "Incorrrect username or password";
        return false;
      }
  }

}
