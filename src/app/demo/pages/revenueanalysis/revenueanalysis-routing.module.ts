import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenueanalysisComponent } from './revenueanalysis.component';

const routes: Routes = [
  {
    path: '',
    component: RevenueanalysisComponent,
    data: {
      title: 'Revenue analysis'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenueanalysisRoutingModule { }
