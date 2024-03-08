import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimRevordsComponent } from '../../pages/claim-revords/claim-revords.component'

const routes: Routes = [
  {
    path: '',
    component: ClaimRevordsComponent,
    data: {
      title: 'ClaimRevords'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRevordsRoutingModule { }
