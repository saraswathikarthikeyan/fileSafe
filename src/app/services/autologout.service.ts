import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Subscription, fromEvent,from, merge, Observable  } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';


const MINUTES_UNITL_AUTO_LOGOUT = 5 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';


@Injectable({
  providedIn: 'root'
})
export class AutologoutService {

  subscription : Subscription;
  handle;

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
 public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router,private loginservice:LoginService) { 
        
  }

  reset() {
    this.setLastAction(Date.now());
  }

  init() {
    localStorage.setItem('lastAction',Date.now().toString());
    this.check();
    this.initListener();
    this.initInterval();
 }

  
initListener() {
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

this.subscription.add( fromEvent(window,'unload').subscribe(e => {this.clearSubscribeLogout()}) );

}

  initInterval() {
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

  clearSubscribeLogout()
  {
    if(localStorage.getItem('isLoggedIn') === 'true') {
     /* autologout */
     this.subscription.unsubscribe();
     clearInterval(this.handle);
     console.log('logout');
     localStorage.clear();
     //this.router.navigate(['./login']);
     this.loginservice.logout();
    }
  }
}