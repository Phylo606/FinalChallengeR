import { Component } from '@angular/core';
import firebase from 'firebase';
import { Router } from '@angular/router'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gameApp';
  user: firebase.User
  constructor(private auth: AuthService,
    private router: Router) { }
    ngOnInit(): void {
      this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
    }
}
