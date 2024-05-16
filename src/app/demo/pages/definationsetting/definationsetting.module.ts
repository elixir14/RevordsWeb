import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinationsettingRoutingModule } from './definationsetting-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DefinationsettingRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class DefinationsettingModule { }
