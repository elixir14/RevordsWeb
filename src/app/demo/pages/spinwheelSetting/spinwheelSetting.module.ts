import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinwheelSettingRoutingModule } from './spinwheelSetting-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list'; 
import {MatTabsModule} from '@angular/material/tabs';
import { SpinwheelSettingComponent } from './spinwheelSetting.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [SpinwheelSettingComponent],
  imports: [
    CommonModule,
    SpinwheelSettingRoutingModule,
    ReactiveFormsModule,
    RouterModule,FormsModule, 
    MatPaginatorModule,MatTableModule,
    MatSlideToggleModule,MatListModule,MatTabsModule,
    ColorPickerModule,MatButtonModule
  ]
})
export class SpinwheelSettingModule { }
