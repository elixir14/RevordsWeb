import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountInfoRoutingModule } from './accountInfo-routing.module';
import { AccountInfoComponent } from './accountInfo.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    AccountInfoRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,FormsModule,MatPaginatorModule,MatTableModule, ToastrModule, MatFormFieldModule
  ],
  declarations: [AccountInfoComponent]
})
export class AccountInfoModule { }
