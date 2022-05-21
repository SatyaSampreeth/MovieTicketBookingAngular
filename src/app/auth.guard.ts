
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
// import {JwtHelperService} from '@auth0/angular-jwt'
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private auth:AuthService, private toast:NgToastService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(!(this.auth.isLoggedIn())){
      //   this.router.navigate([""]);
      //   return false;
      // }
      // // this.router.navigateByUrl('/movie/book')
      // return true;
      if(this.auth.getisLoggedin()){
      // if(localStorage.getItem('token')){
        return true;
    }else{
      this.toast.error({detail:"Access Denied",summary:"Please Login to Access",duration:5000})
      this.router.navigate(['/users/login'])
      return false;
    }
  }
  
}
