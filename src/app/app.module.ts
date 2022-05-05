
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
import { BookComponent } from './main/book/book.component';
import { AdminComponent } from './admin/admin.component';
import { LocationComponent } from './adminuser/location/location.component';
import { MovieComponent } from './adminuser/movie/movie.component';
import { CinemaComponent } from './adminuser/cinema/cinema.component';
import { ShowComponent } from './adminuser/show/show.component';
import { SelectComponent } from './main/select/select.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    BookComponent,
    AdminComponent,
    LocationComponent,
    MovieComponent,
    CinemaComponent,
    ShowComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
