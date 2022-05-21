import { CinemaComponent } from './../../../adminuser/cinema/cinema.component';
import { MovieComponent } from './../../../adminuser/movie/movie.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-locmov',
  templateUrl: './locmov.component.html',
  styleUrls: ['./locmov.component.css']
})
export class LocmovComponent implements OnInit {

  bookForm:any = FormGroup;
  locationList: any = []
  movieList: any = []
  movieImg: any = []
  cinemaImg: any = []
  showImg:any=[]
  // public result: any
  cinemaList: any=[];
  showList:any=[]
  showListId: any=[]

  id!:string
  seats:any=[]
  seatAvailable!:any
  reservedSeats!:any
  reservedSeatsList:any=[]
  selected:any=[]
  total:any=0
  rows:any=[]

  result:any={}
  city:any
  movie:any
  cinema:any
  ticketPrice:any
  show:any

  
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService, private toast:NgToastService) { }


  onChangeLocation(){
    this.movieList = []
    this.movieImg=[]
    this.cinemaImg=[]
    this.showImg=[]
    this.total=0
    this.result={}
    // console.log("the selected value is " + );
      this.auth.getMoviesbyLocation(this.bookForm.value.location)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){
          this.toast.info({detail:"No Shows Available",summary:"Please Try Other Location",duration:5000})
          // alert("No Shows")
        }
        else{for(let item of res){
          if(this.movieList.indexOf(item.title) == -1) {
                this.movieList.push(item.title);
                this.movieImg.push(item);
              }
        }}
        console.log('success',res,this.movieImg)
      },
      error: (err) => { 
        // console.log(err) 
        this.toast.error({detail:"Invalid Movies Details",summary:"Please Try Again",duration:5000})
        // alert("invalid movie details")
      }
    })
  }

  // movie(value:any){
  //   // console.log(this.movieList[this.movieImg.indexOf(value)]  )
  //   this.auth.set_title(this.movieList[this.movieImg.indexOf(value)])
  //   this.auth.set_city(this.bookForm.value.location)
  //   this.router.navigateByUrl('/select');
  // }

  onChangeMovie(){
    this.cinemaList = []
    this.movieImg=[]
    this.cinemaImg=[]
    this.showImg=[]
    this.total=0
    this.result={}
    // console.log("the selected value is " + );
      this.auth.getCinemasbyLocMov(this.bookForm.value.location,this.bookForm.value.movie)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){
          this.toast.info({detail:"No Shows Available",summary:"Please Try Other Movie",duration:5000})
          // alert("No Shows")
        }
        else{
          for(let item of res){
          if(this.cinemaList.indexOf(item.name) == -1) {
                this.cinemaList.push(item.name);
                this.cinemaImg.push(item)
              }
          // console.log(item.name)
        }}
        console.log('success',res,this.cinemaList,this.cinemaImg)
      },
      error: (err) => { 
        // console.log(err) 
        this.toast.error({detail:"Invalid Cinema Details",summary:"Please Try Again",duration:5000})
        // alert("invalid movie details")
      }
    })
  }

  onChangeCinema(){
    this.showList = []
    this.showListId=[]
    this.movieImg=[]
    this.cinemaImg=[]
    this.showImg=[]
    this.total=0
    this.result={}
    // console.log("the selected value is " + );
      this.auth.getShowsbyLocMovCin(this.bookForm.value.location,this.bookForm.value.movie,this.bookForm.value.cinema)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){
          this.toast.info({detail:"No Shows Available",summary:"Please Try Other Cinema",duration:5000})
          // alert("No Shows")
        }
        else{
          for(let item of res){
          if(this.showList.indexOf(item) == -1) {
                this.showList.push(item);
                this.showListId.push(item.id)
                this.showImg.push(item)
              }
          // console.log(item.name)
        }}
        console.log('success',res,this.showList,this.showListId,this.showImg)
      },
      error: (err) => { 
        // console.log(err) 
        this.toast.error({detail:"Invalid Show Details",summary:"Please Try Again",duration:5000})
        // alert("invalid movie details")
      }
    })
  }

  onChangeShow(){

    // this.showList = []
    // this.showListId=[]
    this.movieImg=[]
    this.cinemaImg=[]
    this.showImg=[]
    this.seats=[]
    this.seatAvailable=0
    this.reservedSeats=0
    this.reservedSeatsList=[]
    this.selected=[]
    this.total=0
    this.rows=[]
    this.result={}

    this.id=this.bookForm.value.show
    console.log('id',this.id)
    this.auth.getShowbyId(this.id)
    .subscribe({
          next: (res) => {
            // for (let item of res){
            //   console.log(item)
            // }
            console.log(res)
            this.city=res.city
            this.movie=res.movie
            this.cinema=res.cinema
            this.ticketPrice=res.ticketPrice
            this.show=res.showtime
            this.seats=res.seats
            // this.rows=res.seats.length
            let i:any=0
            while ( i < this.seats.length){
              let j:any=0
              while(j < this.seats[i].length){
                // console.log(this.show[i][j])
                if(this.seats[i][j]==1){
                  this.seats[i][j]=-1
                  this.reservedSeatsList.push([i,j])
                }
                this.total+=1
                j+=1
              }

              i+=1
            }
            this.rows=res.seats
            this.seatAvailable=res.seatsAvailable
            this.reservedSeats=this.total-this.seatAvailable
            console.log('success seats',this.seats)
            console.log('total',this.total)
            // console.log('available',this.seatAvailable)
            // console.log('reserved',this.reservedSeats)
            // console.log('reserved positions',this.reservedSeatsList)
            // alert("detail")
            // this.router.navigate(['book'])
          },
          error: (err) => { 
            // console.log(err)
            this.toast.error({detail:"Invalid Seat Details",summary:"Please Try Again",duration:5000})
            // alert("invalid details")
          }
        })
  }



//   show() {  
//     this.auth.set_showId(this.bookForm.value.show)
//     this.router.navigateByUrl('/seats');
//     console.log(this.bookForm.value.show)
// }

// this.router.navigateByUrl('/user'); demo

public seatSelect(seatNo: number,row:number,col:number) {
  this.toggleSeatSelect(seatNo,row,col);

}

public checkSeatStatus(seatNum: number,row:number,col:number) {
  if (this.rows[row][col]==1) {
  // console.log('sta',row,col)
   return false
  }
  return true;

}

public isSeatReserved(seatNum: number,row:number,col:number) {
  if (this.seats[row][col]==-1) {
      return true

  }
  // console.log('r false')
  return false;

}

/** Used to togle seat selection on click */
public toggleSeatSelect(seatNo: number,row:number,col:number) {
  if(seatNo){
    this.rows[row][col]=0
  }
  else{
    this.rows[row][col]=1
  }
}




openDialog(){
  let i:any=0
  let a:any=0
  while ( i < this.seats.length){
  let j:any=0
  while(j < this.seats[i].length){
    if(this.seats[i][j]==1){
      this.selected.push([i,j])
    }
    if(this.seats[i][j]==-1){
      a+=1
    }
    j+=1
  }

  i+=1
}
console.log(this.selected.length)
if(this.selected.length==0){
  alert('please select seats')
}
// if(a!=this.reservedSeats){
//   alert('error seats, please dont select reserved seats, try again')
// }
if(this.selected.length>0){
  this.auth.setSelected(this.selected)
  this.auth.set_showId(this.id)
  // this.result={
  //   city:this.city,
  //   movie:this.movie,
  //   cinema:this.cinema,
  //   showtime:this.show,
  //   seats:this.selected.length,
  //   ticketPrice:this.ticketPrice,
  //   total:this.selected.length*this.ticketPrice
  // }
  // console.log(this.result.seats)
  this.router.navigateByUrl('/final/confirm');
  
  // this.auth.book(this.id,this.selected)
  // .subscribe({
  //   next:(res)=>{
  //     console.log(res)
  //   },
  //   error: (err) => { console.log(err) 
  //     alert("invalid details")}
  // })
}
}











  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      location: ['',Validators.required],
      movie: ['',Validators.required],
      cinema: ['',Validators.required],
      show: ['',Validators.required]
      // password:['',Validators.required],
      // email:['',Validators.compose([Validators.required,Validators.email])]
    })

    this.auth.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item.city)
        }
        // console.log('success',res,this.locationList)
      },
      error: (err) => { console.log(err) 
        alert("invalid location details")}
    })

  
  }
}
