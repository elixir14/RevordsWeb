import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnSubscribeEmailComponent } from './unsubscribeEmail.component';

const routes: Routes = [
  {
    path: '',
    component: UnSubscribeEmailComponent,
    data: {
      title: 'unsubscribeemail'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnSubScribeEmailRoutingModule { }
