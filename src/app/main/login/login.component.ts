import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;
  // users:any = [];
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService,private http:HttpClient) { }


   login() {
    console.log(this.loginForm.value)
    this.auth.loginUser(this.loginForm.value.email,this.loginForm.value.password)
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
    this.router.navigate(['register'])
  }

}
