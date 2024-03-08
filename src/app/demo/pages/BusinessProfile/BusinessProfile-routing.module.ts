import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessProfileComponent } from './BusinessProfile.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessProfileComponent,
    data: {
      title: 'BusinessProfile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessProfileRoutingModule { }
