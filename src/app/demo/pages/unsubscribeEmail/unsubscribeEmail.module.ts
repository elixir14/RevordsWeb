import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {  CommonModule, NgIf } from '@angular/common';
import { UnSubScribeEmailRoutingModule } from './unsubscribeEmail-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UnSubscribeEmailComponent } from './unsubscribeEmail.component';

@NgModule({
  declarations: [UnSubscribeEmailComponent],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class UnSubScribeEmailModule { }
