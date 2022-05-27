import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from './userInterface';
import {JwtHelperService} from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public jwtHelper:JwtHelperService = new JwtHelperService()

private isLoggedIn!:boolean

public getisLoggedin(){
  const tok:any=localStorage.getItem('token')
  // if(tok && this.jwtHelper.isTokenExpired(tok)){
  //   this.renewToken(localStorage.getItem('refresh'))
  //   return !!tok && !this.jwtHelper.isTokenExpired(tok)
  // }

  return !!tok
  // return this.isLoggedIn
}
public setisLoggedin(value:any){
  this.isLoggedIn=value
}

private role:any='guest'
public setRole(value:string){
  this.role=value
}
public getRole(){
  return this.role
}
private userId!:any
public isAdmin(){
  // console.log(this.getRole())
  if(localStorage.getItem('role')=='admin')
  {
    return true;
  }
  else
  {
    return false;
  }
}
public getUserId(){
  return localStorage.getItem('id')
}

getToken(){
  return localStorage.getItem('token')
}

 private selected!:any

 public getSelected(){
   return this.selected
 }
 public setSelected(value:any){
   this.selected=value
 }

  // private title!: string;
  // public get_title(): string {
  //   return this.title;
  // }
  // public set_title(value: string) {
  //   this.title = value;
  // }
  private city!: string;
  public get_city(): string {
    return this.city;
  }
  public set_city(value: string) {
    this.city = value;
  }
  private title!: string;
  public get_title(): string {
    return this.title;
  }
  public set_title(value: string) {
    this.title = value;
  }
  private showId!:string;
  public get_showId(): string {
    return this.showId;
  }
  public set_showId(value: string) {
    this.showId = value;
  }
  public get_userId() {
    return this.userId;
  }
  public set_userId(value: string) {
    this.userId = value;
  }
  // private _email!: string;
  // public get email(): string {
  //   return this._email;
  // }
  // public set email(value: string) {
  //   this._email = value;
  // }
  // private _pwd!: any;
  // public get pwd(): any {
  //   return this._pwd;
  // }
  // public set pwd(value: any) {
  //   this._pwd = value;
  // }
  // private _token!: string;
  // public get token(): string {
  //   return this._token;
  // }
  // public set token(value: string) {
  //   this._token = value;
  // }
  // private url:string="http://localhost:9000"
  // private url:string="http://52.66.150.213:9000"
  private url:string="http://3.111.213.214:9000"
  details!:any 
  constructor(private http:HttpClient,private router:Router) {}
  getUsers():Observable<User>{
    return this.http.get<User>(this.url);
  }

  getLocations(){
    // this.getisLoggedin()
    return this.http.get<any>(this.url+'/location/all')
  }

  getMovies(){
    return this.http.get<any>(this.url+'/movie/all')
  }

  getMoviesbyLocation(city:string){
    // this.getisLoggedin()
    return this.http.get<any>(this.url+'/movie/all/'+city)
  }

  getCinemasbyLocMov(city:string,title:string){
    // this.getisLoggedin()
    return this.http.get<any>(this.url+'/cinema/'+city+'/'+title)
  }

  getShowsbyLocMovCin(city:string,title:string,name:string){
    // this.getisLoggedin()
    return this.http.get<any>(this.url+'/showtime/'+city+'/'+title+'/'+name)
  }

  getShowbyId(id:string){
    return this.http.get<any>(this.url+'/showtime/'+id)
  }

  getUserDetails(){
    return this.http.get<any>(this.url+'/'+this.getUserId())
  }

  getReservations(){
    return this.http.get<any>(this.url+'/reservation/'+this.getUserId())
  }

  getAllReservations(){
    return this.http.get<any>(this.url+'/reservation/all')
  }

  book(id:string,seats:any){
    const obj={
      id:id,
      seats:seats,
      userId:this.userId
    }
    return this.http.post(this.url+'/showtime/book', obj)
    // http://localhost:9000/showtime/book
  }

  loginUser(email:string,password:string){
    const obj ={
      email: email,
      password: password
    };
    // let result:boolean = false
    return this.http.post(this.url+'/login',obj)
    // .subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     // if(res ){
    //     //   localStorage.setItem('token' , res.token)
    //     //   console.log("Response from API is  " , res)
    //     //   this.router.navigate(['/dashboard']);
  
    //     // }
    //     alert("logged in")
    //     this.router.navigateByUrl('/movie/book')
    //   },
    //   error: (err) => { console.log(err) 
    //   alert("invalid details")} 
    // })
    // console.log(obj)
  }

  // renewToken(value:any){
  //   const obj={
  //     refreshtoken:value
  //   }
  //   return this.http.post<any>(this.url+'/renewtoken', obj)
  //       .subscribe({
  //     next: (res) => {
  //       console.log(res,'called')
  //       localStorage.setItem('token' , res.token)
  //       localStorage.setItem('id',res._id)
  //       localStorage.setItem('role',res.role)
  //       localStorage.setItem('refresh' , res.refreshtoken)
  //       // alert("detail")
  //       // this.router.navigate(['book'])
  //     },
  //     error: (err) => { console.log(err) 
  //       alert("invalid details")}
  //   })
  // }
  // isLoggedIn():any{
  //   return this.getisLoggedin()
  // }


  refresh(value:any):Observable<any>{
    console.log("value here", value)
    return this.http.post<any>(this.url+'/renewtoken',{value})
  }

  signupUser(fname:string,lname:string,email:string,password:string){
    const obj ={
      first_name: fname,
      last_name: lname,
      email: email,
      password: password
    };
    return this.http.post(this.url+'/register',obj)
  }

  // displayshows(location:string, movie:string){
  //   const obj ={
  //     city:location,
  //     title:movie
  //   };
  //   return this.http.get<any>(this.url+'/showtime/'+encodeURIComponent(obj.city)+'/'+encodeURIComponent(obj.title))
  //   .subscribe({
  //     next: (res) => {
  //       console.log(res)
  //       this.details=res
        
  //       // alert("detail")
  //       // this.router.navigate(['book'])
  //     },
  //     error: (err) => { console.log(err) 
  //       alert("invalid details")}
  //   })
  //       // .pipe(map((result:any)=>result.data));
  // }


  displayshows(location:string, movie:string){
    const obj ={
      city:location,
      title:movie
    };
    return this.http.get<any>(this.url+'/showtime/'+obj.city+'/'+obj.title)
    // .pipe(map((result:any)=>result.data));
  }

}
