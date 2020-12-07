import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service'
import { GameService } from '../../game.service'


@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  user: firebase.User
  date: any;
  public matchForm: FormGroup;

  constructor(public gameApi: GameService,
    public fb: FormBuilder,
    public auth: AuthService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.gameApi.GetMatchesList();
    this.matcForm();
    this.auth.getUserState()
    .subscribe(user => {
      this.user = user;
    })
  }
  submitBy() {

  }
  matcForm() {
    this.matchForm = this.fb.group({
      matchTime: [''],
      matchDate: [''],
      matchLocation: [''],
      matchCourt: [''],
      courtFeesPaidBy: [''],
      amountPaid: [''],
      createdBy: ['']
    })
  }
  currentDate() {
    this.date = new Date();
  }

  get matchTime() {
    return this.matchForm.get('matchTime');
  }

  get matchDate() {
    return this.matchForm.get('matchDate');
  }

  get matchLocation() {
    return this.matchForm.get('matchLocation')
  }

  get matchCourt() {
    return this.matchForm.get('matchCourt')
  }
  
  get createdBy() {
    return this.matchForm.get('createdBy')
  }

  ResetForm() {
    this.matchForm.reset();
  }

  submitMatchData() {
    this.gameApi.AddMatch(this.matchForm.value);
    this.toastr.success(this.matchForm.controls['matchLocation'].value + ' successfully added');
    this.ResetForm();
  };
}
