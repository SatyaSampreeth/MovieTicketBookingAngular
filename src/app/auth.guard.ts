
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
// import {JwtHelperService} from '@auth0/angular-jwt'
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public jwtHelper:JwtHelperService = new JwtHelperService()
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
      const token:any=localStorage.getItem('token')
      const ref:any=localStorage.getItem('refresh')


      if(this.auth.getisLoggedin()){
      // if(localStorage.getItem('token')){
        return true;
    }

    else{
      this.toast.error({detail:"Access Denied",summary:"Please Login to Access",duration:5000})
      // localStorage.removeItem('token')
      // localStorage.removeItem('id'),
      // localStorage.removeItem('role')
      // localStorage.removeItem('refresh')
      this.router.navigate(['/users/login'])
      return false;
    }
  }
  
}
