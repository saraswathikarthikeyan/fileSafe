import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { AutologoutService } from '../services/autologout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginLabel:string = "Login";
  constructor(private router:Router , private authGuard:AuthGuard,private autoLogout:AutologoutService) { }

  ngOnInit() {
    this.authGuard.cast.subscribe( (loginstatus) => { this.loginLabel = loginstatus } );   
  }

  
  loginToggle(): void{
    if(!this.authGuard.isLoggedIn) {
      this.router.navigate(['./login']); 
    }
    else { 
      this.autoLogout.clearSubscribeLogout();
    }
  }
}
