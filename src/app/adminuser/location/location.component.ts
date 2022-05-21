import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/common.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }
  locationForm:any = FormGroup;
  updateForm:any = FormGroup;
  locationList:any=[]
  id:any
  show:boolean=false
  result:any={}
  // getAllLocations(){
    
  // }

  addlocation() {
    console.log(this.locationForm.value.city)
    const obj ={
      city: this.locationForm.value.city,
    };
    return this.http.post<any>("http://localhost:9000/location/add",obj)
    .subscribe({
      next: (res) => {
        // for(let item of res){
        //   this.locationList.push(item)
        // }
        
        this.locationList.push(res)
        console.log(this.locationList)
        // alert("logged in")
        // this.router.navigateByUrl('book')
      },
      error: (err) => { console.log(err) 
      alert("already exists")} 
    })
}

delete(value:any){
  console.log(value) 
  return this.http.delete("http://localhost:9000/location/"+ value)
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
  this.srv.getLocationById(this.id)
  .subscribe({
    next: (res) => {
      this.result=res
      console.log('success',this.result)
    },
    error: (err) => { console.log(err) 
      alert("invalid locations details")}
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
  console.log(this.updateForm.value.city)
  const obj ={
    city: this.updateForm.value.city,
  };
  return this.http.patch<any>("http://localhost:9000/location/"+this.id,obj)
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
    this.locationForm = this.formBuilder.group({
      city: new FormControl('', Validators.required)
    })
    this.updateForm = this.formBuilder.group({
      city: new FormControl('', Validators.required)
    })
    this.locationList=[]
    this.srv.getLocations()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.locationList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid locations details")}
    })
  }

}
