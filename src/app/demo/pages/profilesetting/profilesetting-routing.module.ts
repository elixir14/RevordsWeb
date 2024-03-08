import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesettingComponent } from './profilesetting.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesettingComponent,
    data: {
      title: 'Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesettingRoutingModule { }
