import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router:Router, private auth:AuthService, private toast:NgToastService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if((this.auth.getisLoggedin() && this.auth.isAdmin())){
        return true;
    }
    else if(this.auth.getisLoggedin()){
      // localStorage.removeItem('token')
      // localStorage.removeItem('id'),
      // localStorage.removeItem('role')
      this.toast.error({detail:"Access Denied",summary:"Sorry, You are not allowed",duration:5000})
      // alert('You are not allowed')
      // this.router.navigate(['/users/login'])
      this.router.navigate(['/movie/book'])
      return true;
    } else{
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
