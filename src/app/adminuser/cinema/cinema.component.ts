import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  cinemaForm:any = FormGroup;
  cinemaList:any=[]
  locationList:any=[]
  locationId:any=[]
  updateForm:any = FormGroup;
  id:any
  show:boolean=false
  result:any={}

  // getAllCinemas(){
    
  // }
  
  addcinema() {
    let id= this.locationList.indexOf(this.cinemaForm.value.city)
    console.log(this.cinemaForm.value)
    const obj ={
      name: this.cinemaForm.value.name,
      ticketPrice:this.cinemaForm.value.ticketPrice,
      city: this.locationId[id],
      img:this.cinemaForm.value.img
    };
    console.log(obj)
    return this.http.post("http://localhost:9000/cinema/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.cinemaList.push(res)
        this.ngOnInit()
        // alert("logged in")
        // this.router.navigateByUrl('book')
      },
      error: (err) => { console.log(err) 
      alert("invalid details")} 
    })
}

delete(value:any){
  console.log(value) 
  return this.http.delete("http://localhost:9000/cinema/"+ value)
  .subscribe({
    next: (res) => {
      console.log(res)
      this.ngOnInit()
      // this.locationList.remove(value)
      // alert("logged in")
      // this.router.navigateByUrl('book')
    },
    error: (err) => { console.log(err) 
    alert("error")} 
  })
}


edit(value:any){
  this.id=value
  this.result={}
  this.srv.getCinemaById(this.id)
  .subscribe({
    next: (res) => {
      this.result=res
      console.log('success',this.result)
    },
    error: (err) => { console.log(err) 
      alert("invalid cinema details")}
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
    name: this.updateForm.value.name || this.result.name,
    ticketPrice:this.updateForm.value.ticketPrice || this.result.ticketPrice,
    cityId: this.locationId[this.locationList.indexOf(this.updateForm.value.city)] || this.result.city,
    img:this.updateForm.value.img || this.result.img
  };
  return this.http.patch<any>("http://localhost:9000/cinema/"+this.id,obj)
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
    this.cinemaForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    })

    this.updateForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      ticketPrice: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    })

    this.cinemaList=[]
    this.locationList=[]
    this.locationId=[]

      this.srv.getLocations()
      .subscribe({
        next: (res) => {
          for(let item of res){
            this.locationList.push(item.city)
            this.locationId.push(item._id)
          }
          // console.log('success',res,this.locationList,this.locationId)
        },
        error: (err) => { console.log(err) 
          alert("invalid movie details")}
      })


      this.srv.getCinemas()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.cinemaList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })


    }

}
