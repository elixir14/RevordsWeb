import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { TabsModule } from 'ngx-bootstrap/tabs';
import { BillingComponent } from './billing.component';
import { MatTable, MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class BillingModule { }
