import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'UserProfile',
        loadChildren: () => import('../UserProfile/UserProfile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'BusinessGroup',
        loadChildren: () => import('../BusinessGroup/BusinessGroup.module').then(m => m.BusinessGroupModule)
      },
      {
        path: 'Sources',
        loadChildren: () => import('../Sources/Sources.module').then(m => m.SourcesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
