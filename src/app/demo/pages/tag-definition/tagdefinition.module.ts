import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list'; 
import { TagDefinitionRoutingModule } from './tagdefinition-routing.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    TagDefinitionRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,FormsModule, 
    MatPaginatorModule,MatTableModule,MatButtonModule,
    MatSlideToggleModule,MatListModule,MatTabsModule
  ]
})
export class TagdefinitionModule { }
