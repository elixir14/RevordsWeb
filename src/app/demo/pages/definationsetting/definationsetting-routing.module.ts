import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinationsettingComponent } from './definationsetting.component';

const routes: Routes = [
  {
    path: '',
    component: DefinationsettingComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinationsettingRoutingModule { }
