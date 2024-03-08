import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutopilotRoutingModule } from './autopilot-routing.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AutopilotComponent } from './autopilot.component';
import { UtcToLocalTimePipeModule } from 'src/app/utctolocaltime.pipe.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutopilotRoutingModule,
    NgxDaterangepickerMd,
    ReactiveFormsModule,
    FormsModule,
    UtcToLocalTimePipeModule
  ],

})
export class AutopilotModule { }
