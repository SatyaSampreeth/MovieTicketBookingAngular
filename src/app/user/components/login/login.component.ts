import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CommonService } from 'src/app/common.service';
import { NgToastService } from 'ng-angular-popup';
import  jwt_decode from 'jwt-decode'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;
  result:any
  // users:any = [];
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService,private http:HttpClient, private toast:NgToastService) { }


   login() {
    console.log(this.loginForm.value)
    this.auth.loginUser(this.loginForm.value.email,this.loginForm.value.password)
    .subscribe({
            next: (res) => {
              
              this.result=res
              this.auth.setisLoggedin(true)
              this.auth.setRole(this.result.role)
              this.toast.success({detail:"Success Message", summary:"Login is Success",duration:5000})
              // alert("logged in")
              if(this.result.token){
                localStorage.setItem('token' , this.result.token)
                
                localStorage.setItem('id',this.result._id)
                localStorage.setItem('role',this.result.role)
                localStorage.setItem('refresh' , this.result.refreshtoken)
                console.log('refresh set',localStorage.getItem('refresh'))
                const decryptedUser=jwt_decode(this.result.token);
                localStorage.setItem('expiration',Object(decryptedUser).exp)
                this.auth.set_userId(this.result._id)
                // console.log('success',this.result.token)
                this.router.navigate(['/home'])
                // console.log(this.auth.getisLoggedin())
              }

            },
            error: (err) => { console.log(err) 
              this.toast.error({detail:"Login Failed",summary:"Please Try Again",duration:5000})
              // alert("invalid details")
            }
          })
    // const obj ={
    //   email: this.loginForm.value.email,
    //   password: this.loginForm.value.password
    // }
    // console.log(obj)
    // this.http.post('http://localhost:9000/login',obj)
}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])]
    })

  }

  goToRegister(){
    this.router.navigate(['users/register'])
  }

}
