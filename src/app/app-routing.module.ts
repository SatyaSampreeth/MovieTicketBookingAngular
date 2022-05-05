import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './main/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './main/signup/signup.component';
import { BookComponent } from './main/book/book.component';
import { AdminComponent } from './admin/admin.component';
import { LocationComponent } from './adminuser/location/location.component';
import { MovieComponent } from './adminuser/movie/movie.component';
import { CinemaComponent } from './adminuser/cinema/cinema.component';
import { ShowComponent } from './adminuser/show/show.component';
import { SelectComponent } from './main/select/select.component';

const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:SignupComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path: 'book',component:BookComponent
  },
  {
    path: 'admin',component:AdminComponent
  },
  {
    path: 'addlocation',component:LocationComponent
  },
  {
    path: 'addmovie',component:MovieComponent
  },
  {
    path: 'addcinema',component:CinemaComponent
  },
  {
    path: 'addshow',component:ShowComponent
  },
  {
    path: 'select',component:SelectComponent
  },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
