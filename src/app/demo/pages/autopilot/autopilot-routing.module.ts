import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutopilotComponent } from './autopilot.component';

const routes: Routes = [
  {
    path: '',
    component: AutopilotComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutopilotRoutingModule { }
