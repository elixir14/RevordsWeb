import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TexttojoinComponent } from './texttojoin.component';

const routes: Routes = [
  {
    path: '',
    component: TexttojoinComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TexttojoinRoutingModule { }
