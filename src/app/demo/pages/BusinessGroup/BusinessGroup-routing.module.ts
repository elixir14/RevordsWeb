import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessGroupComponent } from './BusinessGroup.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessGroupComponent,
    data: {
      title: 'BusinessGroup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessGroupRoutingModule {
}
