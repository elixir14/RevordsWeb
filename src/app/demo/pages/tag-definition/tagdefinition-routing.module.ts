import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagDefinitionComponent } from './tagdefinition.component';

const routes: Routes = [
  {
    path: '',
    component: TagDefinitionComponent,
    data: {
      title: 'Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagDefinitionRoutingModule { }
