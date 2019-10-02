import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthGuard } from '../auth.guard';
import { HttpClient ,HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { AutologoutService } from '../services/autologout.service';
import { Observable,throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const loginUrl="http://localhost:3000/users";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router:Router, private authGuard: AuthGuard, 
    private autoLogout: AutologoutService, private http:HttpClient ) { }

  logout(): void {
    sessionStorage.setItem('isLoggedIn', "false");
    sessionStorage.removeItem('token');
    this.router.navigate(['./login']);    
  }
  

  setSession(token):void  {
    this.authGuard.editLoginStatus('Logout');
    sessionStorage.setItem('isLoggedIn', "true");
    sessionStorage.setItem('token', token);
  }

  public handleError(error: HttpErrorResponse | any) {

    let errMsg: string;
  
    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    return throwError(errMsg);
  
  }

    //Method called on Loin
    login(userModel:User): Boolean {

      if(userModel.username === "saraswathi" && userModel.password === "test")
        {          
            this.setSession(userModel.username);  
          return true;    
        }
        else {
          let errorMessage = "Incorrrect username or password";
          return false;
        }
    }

  loginWithBackend(userModel:User): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders ( {
      'Type': 'POST',
      'Content-Type': 'application/json' 
    })
    };
    console.log(userModel);

    /*return this.http.post<any>((loginUrl+'/login'), userModel,httpOptions).
    pipe(map((data) => { this.setSession(data.token); console.log(data); return data.success; })).pipe(catchError(this.handleError));*/
 
    return this.http.post<any>((loginUrl+'/login'), userModel,httpOptions).
    pipe(map((data) => { this.setSession(data.token); console.log(data); return data; })).pipe(catchError(this.handleError));
  }






}
