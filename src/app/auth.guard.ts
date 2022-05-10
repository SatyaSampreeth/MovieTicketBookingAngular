
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router, private auth:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(!(this.auth.isLoggedIn())){
      //   this.router.navigate([""]);
      //   return false;
      // }
      // // this.router.navigateByUrl('/movie/book')
      // return true;
      if(localStorage.getItem('token')){
        return true;
    }else{
      this.router.navigate(['/users/login'])
      return false;
    }
  }
  
}
