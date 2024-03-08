import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignreachComponent } from './campaignreach.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignreachComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignreachRoutingModule { }
