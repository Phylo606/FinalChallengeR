import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: firebase.User;
  authError: any;
  constructor(public auth: AuthService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.auth.getUserState()
    .subscribe(user => {
      this.user = user;
    })
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    })
  }
  createUser(frm) {
    this.auth.createUser(frm.value);
    frm.reset();
    setTimeout(() => {
      this.router.navigate(['/login'])
    }
    , 500);
  }

}
