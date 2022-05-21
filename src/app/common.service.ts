import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url:any = 'http://localhost:9000';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get<any>(this.url+'/users');
  }

  getLocations(){
    return this.http.get<any>(this.url+'/location/all')
  }
  getLocationById(value:any){
    return this.http.get<any>(this.url+'/location/'+value)
  }


  getMovies(){
    return this.http.get<any>(this.url+'/movie/all')
  }

  getMovieById(value:any){
    return this.http.get<any>(this.url+'/movie/'+value)
  }

  getCinemaById(value:any){
    return this.http.get<any>(this.url+'/cinema/cinema/'+value)
  }
  
  getShowById(value:any){
    return this.http.get<any>(this.url+'/showtime/show/'+value)
  }

  getUserById(value:any){
    return this.http.get<any>(this.url+'/'+value)
  }

  getCinemas(){
    return this.http.get<any>(this.url+'/cinema/all')
  }

  getShows(){
    return this.http.get<any>(this.url+'/showtime/all')
  }

  getCinemasByLoc(value:any){
    return this.http.get<any>(this.url+'/cinema/'+value)
  }

}
