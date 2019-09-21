import { Component, OnInit } from '@angular/core';
import { AutologoutService } from '../services/autologout.service';


@Component({
  selector: 'app-autologout',
  templateUrl: './autologout.component.html',
  styleUrls: ['./autologout.component.scss']
})
export class AutologoutComponent implements OnInit {

  constructor( private autoLogoutService: AutologoutService) {
    localStorage.setItem('lastAction',Date.now().toString());
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

}
