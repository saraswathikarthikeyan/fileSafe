import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent,from, merge, Observable,throwError  } from 'rxjs';
import { subscribeOn,map, catchError } from 'rxjs/operators';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AuthGuard } from '../auth.guard';
import { HttpClient ,HttpHeaders, HttpErrorResponse, HttpEventType } from '@angular/common/http';

const logOutUrl="http://localhost:3000/users";

const MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';


@Injectable({
  providedIn: 'root'
})
export class AutologoutService {

  subscription : Subscription;
  handle;

  public getLastAction() : number{
    return parseInt(sessionStorage.getItem(STORE_KEY));
  }
  
 public setLastAction(lastAction: number): void {
  sessionStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, private authGuard:AuthGuard,private http:HttpClient) { 
    this.check();
    this.initListener();
    this.initInterval();     
    this.setLoginStatus();     
  }

  reset() : void{
    this.setLastAction(Date.now());
  }

  init() : void{
    sessionStorage.setItem('lastAction',Date.now().toString());
    this.check();
    this.initListener();
    this.initInterval();
 }

  
initListener(): void {
const  events = [
    'scroll',
    'wheel',
    'touchmove',
    'touchend',
    'resize',                            
    'click',
    'mousemove',
    'close',
    'keypress'
];
const eventStreams = events.map((ev) => fromEvent(document, ev));
const allEvents$ = merge(...eventStreams);

this.subscription = allEvents$.subscribe((event) => {
  // do something with event...
  // event may be of any type present in the events array.
  //console.log(event);
  this.reset();
});

this.subscription.add( fromEvent(window,'close').subscribe(e => { this.clearSubscribeLogout() }) );

}  

  initInterval(): void {  
   this.handle = setInterval(() => { 
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    console.log(diff);

    // if (isTimeout && this.auth.loggedIn)
    if (isTimeout)  {     
      this.clearSubscribeLogout();
    }
  }

  clearSubscribeLogout() : void   {
    if(this.authGuard.isLoggedIn) {

      this.authGuard.editLoginStatus('Login');
      
      /*this.http.get<any>((logOutUrl+'/logout')).
      pipe(map((data) => { console.log(data); })).pipe(catchError(this.handleError));*/
  
     /* autologout */
     this.subscription.unsubscribe();
     clearInterval(this.handle);
     sessionStorage.clear();
     sessionStorage.setItem('isLoggedIn', "false");
     sessionStorage.removeItem('token');
     this.router.navigate(['./login']);    
    }
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


  setLoginStatus():void{
    if(this.authGuard.isLoggedIn)
    {
      this.authGuard.editLoginStatus("Logout");
    }
    else{
      this.authGuard.editLoginStatus("Login");
    }
  }
}