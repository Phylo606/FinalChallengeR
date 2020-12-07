import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchListComponent } from './crud/match-list/match-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddMatchComponent } from './crud/add-match/add-match.component';
import { EditMatchComponent } from './crud/edit-match/edit-match.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'add-match',
    component: AddMatchComponent
  },
  {
    path: 'match-list',
    component: MatchListComponent
  },
  {
    path: 'edit-match/:id',
    component: EditMatchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
