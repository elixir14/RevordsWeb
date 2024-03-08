import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { ToastsContainer } from '../toastcontainer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthenticationRoutingModule,FormsModule,
    ReactiveFormsModule ,ToastsContainer,MatSnackBarModule,
    BrowserModule,MatPaginatorModule, ToastrModule.forRoot()]
})
export class AuthenticationModule {}
