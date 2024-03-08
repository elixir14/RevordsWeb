import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsettingRoutingModule } from './rewardsetting-routing.module';
import { RewardsettingComponent } from './rewardsetting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  
  imports: [
    CommonModule,
    RewardsettingRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,FormsModule,MatPaginatorModule,MatTableModule, ToastrModule
  ],
  declarations: [RewardsettingComponent]
})
export class RewardsettingModule { }
