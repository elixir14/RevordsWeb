import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLinksComponent } from './applinks.component';

const routes: Routes = [
    {
        path: '',
        component: AppLinksComponent,
        data: {
          title: 'App'
        }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLinksRoutingModule {}
