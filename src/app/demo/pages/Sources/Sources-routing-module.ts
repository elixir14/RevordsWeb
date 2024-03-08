import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourcesComponent } from './Sources.component';

const routes: Routes = [
  {
    path: '',
    component: SourcesComponent,
    data: {
      title: 'Sources'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule {
}
