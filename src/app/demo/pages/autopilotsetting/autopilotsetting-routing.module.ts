import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutopilotsettingComponent } from './autopilotsetting.component';

const routes: Routes = [
  {
    path: '',
    component: AutopilotsettingComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutopilotsettingRoutingModule { }
