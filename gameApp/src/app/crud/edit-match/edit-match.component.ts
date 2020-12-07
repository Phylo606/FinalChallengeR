import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import { GameService } from '../../game.service';
import { Location } from '@angular/common';
import firebase from 'firebase';

@Component({
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.css']
})
export class EditMatchComponent implements OnInit {
user: firebase.User
  editForm: FormGroup; 
  constructor(private gameApi: GameService,       
    private fb: FormBuilder,           
    private location: Location,        
    private actRoute: ActivatedRoute, 
    private router: Router,           
    private toastr: ToastrService,
  private auth: AuthService) { }

  ngOnInit(): void {
    this.updateMatchData();   // Call updateStudentData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.gameApi.GetMatch(id).valueChanges().subscribe(data => {
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    });
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
    })
  }
   // Accessing form control using getters
  get matchTime() {
    return this.editForm.get('matchTime');
  }

  get matchDate() {
    return this.editForm.get('matchDate');
  }

  get matchLocation() {
    return this.editForm.get('matchLocation');
  }

  get matchCourt() {
    return this.editForm.get('matchCourt')
  }

  get courtFeesPaidBy() {
    return this.editForm.get('courtFeesPaidBy');
  }
    get amountPaid() {
    return this.editForm.get('amountPaid');
    }
  get createdBy() {
    return this.editForm.get('createdBy');
  }


  
  // Contains Reactive Form logic
  updateMatchData() {
    this.editForm = this.fb.group({
      matchTime: [''],
      matchDate: [''],
      matchLocation: [''],
      matchCourt: [''],
      courtFeesPaidBy: [''],
      amountPaid: [''],
      createdBy:['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm(){
    this.gameApi.UpdateMatch(this.editForm.value);       // Update student data using CRUD API
    this.toastr.success(this.editForm.controls['matchLocation'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['view-students']);               // Navigate to student's list page when student data is updated
  }


}
