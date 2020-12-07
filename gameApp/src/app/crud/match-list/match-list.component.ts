import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { GameService } from '../../game.service';
import firebase from 'firebase';
interface Match {
    $key: string;
    matchTime: string;
    matchDate: string;
  matchLocation: string;
  matchCourt: string;
  courtFeesPaidBy: string;
  amountPaid: string;
  createdBy: string;
 }
@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
p: number = 1;
  user: firebase.User;                 // Settup up pagination variable
  Match: Match[];                 // Save students data in Student's array.
  hideWhenNoMatch: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  constructor(public gameApi: GameService, // Inject student CRUD services in constructor.
    public toastr: ToastrService,
  private auth: AuthService,) { }

  
   
  ngOnInit(): void {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.gameApi.GetMatchesList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Match = [];
      data.forEach(item => {
        let a = JSON.parse(JSON.stringify(item.payload)); 
        a['$key'] = item.key;
        this.Match.push(a as Match);
      })
    })
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
    })
  }
  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.gameApi.GetMatchesList().valueChanges().subscribe(data => {
      
      if(data.length <= 0){
        this.hideWhenNoMatch = false;
        this.noData = true;
      } else {
        this.hideWhenNoMatch = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteMatch(match) {
    if (window.confirm('Are sure you want to delete this Game?')) { // Asking from user before Deleting student data.
      this.gameApi.DeleteMatch(match.$key) // Using Delete student API to delete student.
      this.toastr.success(match.matchLocation + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }

  greaterThan(x: string) {
    var y = new Date(x);
    var z = new Date();

    return y >= z;
  }
}