import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, from, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loginStatus = new BehaviorSubject<string>('Login');
  cast = this.loginStatus.asObservable();

  constructor(private router: Router ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url; 
    return this.verifyLogin(url);
  }

  verifyLogin(url) : boolean{
    if(!this.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
    }
    else if(this.isLoggedIn()){
        return true;
    }
}
public isLoggedIn(): boolean{
    let status = false;
    if( sessionStorage.getItem('isLoggedIn') === "true"){
      status = true;
    }
    else{
      status = false;
    }
    return status;
}

public editLoginStatus(newStatus):void{
  this.loginStatus.next(newStatus);
}

}
