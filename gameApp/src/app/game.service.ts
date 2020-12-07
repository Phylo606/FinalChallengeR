import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { Match } from './match'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  matchesRef: AngularFireList<any>;
  matchRef: AngularFireObject<any>;
  newUser: any;

  constructor(private db: AngularFireDatabase,
    private dbs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    public fb: FormBuilder,
    public toastr: ToastrService,) { }

  AddMatch(match: Match) {
    this.matchesRef.push({
      matchTime: match.matchTime,
      matchDate: match.matchDate,
      matchLocation: match.matchLocation,
      matchCourt: match.matchCourt,
      courtFeesPaidBy: match.courtFeesPaidBy,
      amountPaid: match.amountPaid,
      createdBy: match.createdBy
    })
  }

  GetMatch(id: string) {
    this.matchRef = this.db.object('matches-list/' + id);
    return this.matchRef;
  }

  GetMatchesList() {
    this.matchesRef = this.db.list('matches-list');
    return this.matchesRef;
  }

  UpdateMatch(match: Match) {
    this.matchRef.update({
      matchTime: match.matchTime,
      matchDate: match.matchDate,
      matchLocation: match.matchLocation,
      matchCourt: match.matchCourt,
      courtFeesPaidBy: match.courtFeesPaidBy,
      amountPaid: match.amountPaid,
      createdBy: match.createdBy
    })
  }

  DeleteMatch(id: string) {
    this.matchRef = this.db.object('matches-list/'+id);
    this.matchRef.remove();
  }
}
