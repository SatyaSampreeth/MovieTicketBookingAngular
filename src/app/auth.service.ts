import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from './userInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  private url:string="http://localhost:9000"
  details!:any 
  constructor(private http:HttpClient,private router:Router) { }
  getUsers():Observable<User>{
    return this.http.get<User>(this.url);
  }

  getLocations(){
    return this.http.get<any>(this.url+'/location/all')
  }

  getMovies(){
    return this.http.get<any>(this.url+'/movie/all')
  }

  getMoviesbyLocation(city:string){
    return this.http.get<any>(this.url+'/movie/'+city)
  }

  getShowbyId(id:string){
    return this.http.get<any>(this.url+'/showtime/'+id)
  }

  loginUser(email:string,password:string){
    const obj ={
      email: email,
      password: password
    };
    // let result:boolean = false
    return this.http.post(this.url+'/login',obj).subscribe({
      next: (res) => {
        console.log(res)
        alert("logged in")
        this.router.navigateByUrl('book')
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
    // console.log(obj)
  }

  signupUser(fname:string,lname:string,email:string,password:string){
    const obj ={
      first_name: fname,
      last_name: lname,
      email: email,
      password: password
    };
    return this.http.post(this.url+'/register',obj).subscribe({
      next: (res) => {
        console.log(res)
        alert("registered")
        this.router.navigate(['book'])
      },
      error: (err) => { console.log(err) 
        alert("invalid details")}
    })
    console.log(obj)
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
