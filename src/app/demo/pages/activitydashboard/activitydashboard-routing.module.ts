import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitydashboardComponent } from './activitydashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ActivitydashboardComponent,
    data: {
      title: ''
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitydashboardRoutingModule { }
