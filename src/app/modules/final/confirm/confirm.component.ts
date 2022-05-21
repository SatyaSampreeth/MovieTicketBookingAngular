import { Router } from '@angular/router';
import { User } from 'src/app/userInterface';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }
  selected:any
  id!:string
  result:any={}
  userId!:string

  confirm(){
    this.router.navigateByUrl('/bookings');
  }

  ngOnInit(): void {
    this.selected=this.auth.getSelected()
    this.id=this.auth.get_showId()
    // this.userId= this.auth.get_userId()
    // console.log(this.selected)

     this.auth.book(this.id,this.selected)
      .subscribe({
        next:(res)=>{
          this.result=res
          console.log(this.result)
        },
        error: (err) => { console.log(err) 
          alert("invalid details")}
      })
  }

}
