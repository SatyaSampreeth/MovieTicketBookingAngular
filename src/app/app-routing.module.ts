import { DashboardComponent } from './main/dashboard/dashboard.component';
import { LoginComponent } from './user/components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './user/components/signup/signup.component';
import { BookComponent } from './main/book/book.component';
import { AdminComponent } from './admin/admin.component';
import { LocationComponent } from './adminuser/location/location.component';
import { MovieComponent } from './adminuser/movie/movie.component';
import { CinemaComponent } from './adminuser/cinema/cinema.component';
import { ShowComponent } from './adminuser/show/show.component';
import { SelectComponent } from './main/select/select.component';
import { SeatsComponent } from './main/seats/seats.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { RoleGuard } from './role.guard';
import { UserComponent } from './adminuser/user/user.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {path: 'movie', loadChildren: () => import("./modules/movie/movie.module").then(module => module.MovieModule)  },
  {path: 'users', loadChildren: () => import("./user/user.module").then(module => module.UserModule) },
  {path: 'final', loadChildren: () => import("./modules/final/final.module").then(module => module.FinalModule) },
  {path: 'admin', loadChildren: () => import("./admin_modules/location/location.module").then(module => module.LocationModule) },
  {
    path:'bookings',component:DashboardComponent,canActivate:[AuthGuard]
  },
  // {
  //   path: 'book',component:BookComponent
  // },
  {
    path: 'home',component:AdminComponent,canActivate:[AuthGuard]
  },
  {
    path: 'addlocation',component:LocationComponent,canActivate:[RoleGuard]
  },
  {
    path: 'addmovie',component:MovieComponent,canActivate:[RoleGuard]
  },
  {
    path: 'addcinema',component:CinemaComponent,canActivate:[RoleGuard]
  },
  {
    path: 'addshow',component:ShowComponent,canActivate:[RoleGuard]
  },
  {
    path: 'adduser',component:UserComponent,canActivate:[RoleGuard]
  },
  {
    path: 'select',component:SelectComponent
  },
  {
    path: 'seats',component:SeatsComponent,canActivate:[AuthGuard]
  },
  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
