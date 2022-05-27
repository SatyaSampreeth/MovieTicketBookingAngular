import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
 

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  showForm:any = FormGroup;
  showList:any=[]
  locationList:any=[]
  movieList:any=[]
  cinemaList:any=[]
  cinemaListId: any=[];
  movieListId:any=[];
  locationListId:any=[]
  updateForm:any = FormGroup;
  id:any
  show:boolean=false
  result:any={}

      // url:any = 'http://localhost:9000';
      // url:any="http://52.66.150.213:9000"
      url:any="http://3.111.213.214:9000"

  addshow() {
    console.log(this.showForm.value)
    console.log(this.movieListId[this.movieList.indexOf(this.showForm.value.movieId)])
    console.log(this.locationListId[this.locationList.indexOf(this.showForm.value.cityId)])
    console.log(this.cinemaListId[this.cinemaList.indexOf(this.showForm.value.cinemaId)])
    // let movieId=
    const obj ={
      startAt: this.showForm.value.startAt,
      movieId:this.movieListId[this.movieList.indexOf(this.showForm.value.movieId)],
      row:this.showForm.value.row,
      col:this.showForm.value.col,
      cinemaId: this.cinemaListId[this.cinemaList.indexOf(this.showForm.value.cinemaId)],
      cityId: this.locationListId[this.locationList.indexOf(this.showForm.value.cityId)],
    };
    // return this.http.post("http://localhost:9000/showtime/add",obj)
    return this.http.post(this.url+"/showtime/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.ngOnInit()
        // alert("logged in")
        // this.router.navigateByUrl('book')
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
}

onChangeLocation(){
  this.cinemaList=[]
  this.cinemaListId=[]

  let a= this.locationList.indexOf(this.showForm.value.cityId)
  console.log(this.locationListId[a])
    this.srv.getCinemasByLoc(this.locationListId[a])
      .subscribe({
        next: (res) => {
          for(let item of res){
            this.cinemaList.push(item.name)
            this.cinemaListId.push(item._id)
          }
          console.log('cinema',this.cinemaList,this.cinemaListId)
        },
        error: (err) => { console.log(err) 
          alert("invalid cinema details")}
      })
}

delete(value:any){
  console.log(value) 
  // return this.http.delete("http://localhost:9000/showtime/"+ value)
  return this.http.delete(this.url+"/showtime/"+ value)
  .subscribe({
    next: (res) => {
      console.log('deleted',res)
      this.ngOnInit()
    },
    error: (err) => { console.log(err) 
    alert("error")} 
  })
}

edit(value:any){
  this.id=value
  this.result={}
  this.srv.getShowById(this.id)
  .subscribe({
    next: (res) => {
      this.result=res
      console.log('success',this.result)
    },
    error: (err) => { console.log(err) 
      alert("invalid show details")}
  })
  console.log(this.id)
  this.show=true
}

close(){
  // this.result={}
  // this.id=''
  this.show=false
}

update(){
  // let id= this.locationList.indexOf(this.updateForm.value.city)
  console.log('clicked',this.updateForm.value)
  const obj ={
    startAt: this.updateForm.value.startAt || this.result.startAt,
    movieId:this.movieListId[this.movieList.indexOf(this.updateForm.value.movieId)] || this.result.movieId,
    // row:this.showForm.value.row,
    // col:this.showForm.value.col,
    // cinemaId: this.cinemaListId[this.cinemaList.indexOf(this.updateForm.value.cinemaId)] || this.result.cinemaId,
    // cityId: this.locationListId[this.locationList.indexOf(this.updateForm.value.cityId)] || this.result.cityId,
  };
  console.log('sent',obj)
  // return this.http.patch<any>("http://localhost:9000/showtime/"+this.id,obj)
  return this.http.patch<any>(this.url+"/showtime/"+this.id,obj)
  .subscribe({
    next: (res) => {
      // for(let item of res){
      //   this.locationList.push(item)
      // }
      console.log(res)
      this.close()
      this.ngOnInit()
      // this.locationList.push(res)
      
      // alert("logged in")
      // this.router.navigateByUrl('book')
    },
    error: (err) => { console.log(err) 
    alert("already exists")} 
  })
}


  ngOnInit(): void {
    this.showForm = this.formBuilder.group({
      startAt: new FormControl('', Validators.required),
      movieId: new FormControl('', Validators.required),
      cinemaId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      row: new FormControl('', Validators.required),
      col: new FormControl('', Validators.required),
    })

    this.updateForm = this.formBuilder.group({
      startAt: new FormControl('', Validators.required),
      movieId: new FormControl('', Validators.required),
      cinemaId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      row: new FormControl('', Validators.required),
      col: new FormControl('', Validators.required),
    })

  this.locationList=[]
  this.movieList=[]
  this.showList=[]
  this.locationListId=[]
  this.movieListId=[]

    this.srv.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item.city)
          this.locationListId.push(item._id)
        }
        console.log('location',this.locationList,this.locationListId)
      },
      error: (err) => { console.log(err) 
        alert("invalid Location details")}
    })

    this.srv.getMovies()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.movieList.push(item.title)
          this.movieListId.push(item._id)
        }
        console.log('movies',this.movieList,this.movieListId)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
    this.srv.getShows()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.showList.push(item)
        }
        console.log('shows',this.showList)
      },
      error: (err) => { console.log(err) 
        alert("invalid show details")}
    })
  }

}
