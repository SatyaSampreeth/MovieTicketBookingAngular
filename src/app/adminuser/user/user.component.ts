import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  userForm:any = FormGroup;
  userList:any=[]
  updateForm:any = FormGroup;
  id:any
  show:boolean=false
  result:any
  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  adduser() {
    console.log(this.userForm.value)
    const obj ={
      first_name: this.userForm.value.fname,
      last_name:this.userForm.value.lname,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      // role:this.userForm.value.role
    };
    return this.http.post("http://localhost:9000/register",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.userList.push(res)
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
  return this.http.delete("http://localhost:9000/"+ value)
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
  this.result=['guest','admin']
  console.log(this.result)
  this.srv.getUserById(this.id)
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
  console.log(this.updateForm.value.role)
  const obj ={
    role: this.updateForm.value.role,
  };
  return this.http.patch<any>("http://localhost:9000/"+this.id,obj)
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
    
    this.userForm = this.formBuilder.group({
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password:new FormControl('', Validators.required),
      // role: new FormControl('', Validators.required)
    })

    this.updateForm = this.formBuilder.group({
      role: new FormControl('', Validators.required)
    })

    
    this.userList=[]

    this.srv.getUsers()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.userList.push(item)
        }
        console.log('success',res,this.userList)
      },
      error: (err) => { console.log(err) 
        alert("invalid user details")}
    })
  }


}
