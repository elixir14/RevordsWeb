import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutopilotsettingRoutingModule } from './autopilotsetting-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AutopilotsettingComponent } from './autopilotsetting.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import { ToggleButtonComponent } from './../toggle-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AutopilotsettingComponent],
  imports: [
    CommonModule,
    AutopilotsettingRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    NgbModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class AutopilotsettingModule { }
