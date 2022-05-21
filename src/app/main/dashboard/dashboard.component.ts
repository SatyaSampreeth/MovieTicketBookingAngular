import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  reservationList:any=[]
  allList:any=[]

  bookTickets(){
    this.router.navigate(['/movie/book'])
  }

  ngOnInit(): void {
   

    if(this.auth.isAdmin()){
      this.reservationList=[]
      this.auth.getAllReservations()
      .subscribe({
        next: (res) => {
          for(let item of res){
            this.allList.push(item)
          }
          console.log('success admin',res,this.allList)
        },
        error: (err) => { console.log(err) 
          alert("invalid total details")}
      })
    }
    if(localStorage.getItem('role')=='guest'){
      this.allList=[]
      this.auth.getReservations()
      .subscribe({
        next: (res) => {
          for(let item of res){
            this.reservationList.push(item)
          }
          console.log('success',res,this.reservationList)
        },
        error: (err) => { console.log(err) 
          alert("invalid user bookings details")}
      })
    }
  }

}
