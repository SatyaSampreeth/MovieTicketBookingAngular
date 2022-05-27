import jwt_decode  from 'jwt-decode';
import { AuthService } from 'src/app/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  jwtHelper = new JwtHelperService();
  constructor(private injector: Injector, public auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // let auth = this.injector.get(AuthService)
    // console.log("Intercepted");
    //   let tokenizedReq = req.clone({
    //     setHeaders:{
    //       Authorization: `Bearer ${auth.getToken()}`
    //     }
    //   })
    //   return next.handle(tokenizedReq)


    let a=(localStorage.getItem('token'))
    if (a) {
      if (req.url.indexOf('renewtoken') > -1) {
        return next.handle(req)
      }
      let exp = localStorage.getItem('expiration')
      let token = localStorage.getItem('token')
      console.log(token)
      console.log("above is the token")
      let refreshToken = localStorage.getItem('refresh')
      const date = new Date(0)
      console.log(Date.now())
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(Number(exp) * 1000)
      if (Date.now() < Number(exp) * 1000) {
        console.log("hi inside 1st loop")
        let tokenizedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        return next.handle(tokenizedReq)
      }
      return this.auth.refresh(refreshToken)
        .pipe(
          switchMap((newToken: any) => {
            console.log(newToken)
            console.log("new token is getting added")
            localStorage.setItem('token', newToken.token);
            localStorage.setItem('refresh', newToken.refreshtoken)
            const decryptedUser = jwt_decode(newToken.token);
            console.log(Object(decryptedUser).exp);
            console.log("decrypted User is above")
            console.log(newToken)
            console.log("hi inside 2nd loop")
            localStorage.setItem('expiration', Object(decryptedUser).exp)
            let tokenizedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.token}`
              }
            })
            return next.handle(tokenizedReq)
          })
        )
    }
  else{
    return next.handle(req)
  }
  }
}

