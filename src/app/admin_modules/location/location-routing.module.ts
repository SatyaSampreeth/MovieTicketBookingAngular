import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocComponent } from './loc/loc.component';

const routes: Routes = [
  {
    path:'loc',component:LocComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
