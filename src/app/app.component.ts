import { Component } from '@angular/core';
import { LoginService } from './services/LoginService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  href = '';
  constructor(private _loginservice: LoginService, private _Route: Router) {
    let selectedbusinessGroup = JSON.parse(localStorage.getItem('BusinessGroup'));
    this.href = window.location.href;
    let userData = JSON.parse(localStorage.getItem('UserData'));
    if ((userData == null || userData.length <= 0) && !this.href.toLowerCase().includes('unsubscribeemail') && !this.href.toLowerCase().includes('claimrevords') && !this.href.toLowerCase().includes('setpassword') && !this.href.toLowerCase().includes('applinks')) {
      this._Route.navigate(['login']);
    } 
    // else if (!this.href.toLowerCase().includes('claimrevords') && !this.href.toLowerCase().includes('unsubscribeemail') && !this.href.toLowerCase().includes('setpassword') && !this.href.toLowerCase().includes('applinks')) {
    //   this._Route.navigate(['dashboard']);
    // }
  }
}
