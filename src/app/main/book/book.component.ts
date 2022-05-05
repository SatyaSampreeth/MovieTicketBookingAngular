import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/userInterface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookForm:any = FormGroup;
  locationList: any = []
  movieList: any = []
  public result: any
  constructor(private formBuilder: FormBuilder, private router:Router, private auth:AuthService) { }

  // async show(){
  //   console.log(this.bookForm.value)
  //   this.auth.displayshows(this.bookForm.value.location,this.bookForm.value.movie)
  //   // .subscribe(result=> {
  //   //   this.result = result;
  //   //   // this.loaded = true;
  //   //   console.log(this.result);
  //   // });
  //   this.result = this.auth.details
  //   console.log(this.result)
  // }

  onChangeLocation(){
    this.movieList = []
    // console.log("the selected value is " + );
      this.auth.getMoviesbyLocation(this.bookForm.value.location)
    .subscribe({
      next: (res) => {
        if(res=='No Shows'){alert("No Shows")}
        else{for(let item of res){
          if(this.movieList.indexOf(item.title) == -1) {
                this.movieList.push(item.title);}
        }}
        // console.log('success',res,this.locationList)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

  show() {  
    this.auth.set_title(this.bookForm.value.movie)
    this.auth.set_city(this.bookForm.value.location)
    
    this.router.navigateByUrl('/select');
    // this.auth.displayshows(this.bookForm.value.location,this.bookForm.value.movie)
    // .subscribe({
    //       next: (res) => {
    //         console.log('success',res)
    //         this.result=res
    //         // alert("detail")
    //         // this.router.navigate(['book'])
    //       },
    //       error: (err) => { console.log(err) 
    //         alert("invalid details")}
    //     })
    // .subscribe((data) =>{console.log('success', data) this.result=data} , error => console.log('error', error))  
}

// this.router.navigateByUrl('/user');

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      location: ['',Validators.required],
      movie: ['',Validators.required]
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
