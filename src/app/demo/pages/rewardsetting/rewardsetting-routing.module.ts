import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardsettingComponent } from './rewardsetting.component';

const routes: Routes = [
  {
    path: '',
    component: RewardsettingComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsettingRoutingModule { }
