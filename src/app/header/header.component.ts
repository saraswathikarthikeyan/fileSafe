import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { AutologoutService } from '../services/autologout.service';
  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService,private autoLogout:AutologoutService) { }

  ngOnInit() {
  }

  onLoguout(){
    this.autoLogout.clearSubscribeLogout();
    //this.loginService.logout();
  }
}
