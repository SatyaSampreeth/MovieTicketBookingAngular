import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private srv:CommonService) { }

  movieForm:any = FormGroup;
  movieList:any=[]
  updateForm:any = FormGroup;
  id:any
  show:boolean=false
  result:any={}

    // url:any = 'http://localhost:9000';
    // url:any="http://52.66.150.213:9000"
    url:any="http://3.111.213.214:9000"

  addmovie() {
    console.log(this.movieForm.value)
    const obj ={
      title: this.movieForm.value.title,
      language:this.movieForm.value.language,
      genre: this.movieForm.value.genre,
      img:this.movieForm.value.img
    };
    // return this.http.post("http://localhost:9000/movie/add",obj)
    return this.http.post(this.url+"/movie/add",obj)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.movieList.push(res)
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
  // return this.http.delete("http://localhost:9000/movie/"+ value)
  return this.http.delete(this.url+"/movie/"+ value)
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
  this.srv.getMovieById(this.id)
  .subscribe({
    next: (res) => {
      this.result=res
      console.log('success',this.result)
    },
    error: (err) => { console.log(err) 
      alert("invalid movie details")}
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
  console.log(this.updateForm.value)
  const obj ={
    title: this.updateForm.value.title || this.result.title,
    language:this.updateForm.value.language || this.result.language,
    genre: this.updateForm.value.genre || this.result.genre,
    img:this.updateForm.value.img || this.result.img
  };
  // return this.http.patch<any>("http://localhost:9000/movie/"+this.id,obj)
  return this.http.patch<any>(this.url+"/movie/"+this.id,obj)
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
    this.movieForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    })

    this.updateForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required)
    })
    
    this.movieList=[]

    this.srv.getMovies()
    .subscribe({
      next: (res) => {
        for(let item of res){
          this.movieList.push(item)
        }
        console.log('success',res)
      },
      error: (err) => { console.log(err) 
        alert("invalid movie details")}
    })
  }

}
