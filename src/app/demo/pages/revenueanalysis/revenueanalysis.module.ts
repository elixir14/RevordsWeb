import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevenueanalysisRoutingModule } from './revenueanalysis-routing.module';
import { RevenueanalysisComponent } from './revenueanalysis.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { UtcToLocalTimePipeModule } from 'src/app/utctolocaltime.pipe.module';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    RevenueanalysisComponent
  ],
  imports: [
    CommonModule,
    RevenueanalysisRoutingModule,
    NgApexchartsModule,
    NgSelectModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    MatSliderModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    NgxDaterangepickerMd,
    UtcToLocalTimePipeModule,
    MatTabsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSkeletonLoaderModule.forRoot({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 50,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#ffb094",
      innerStrokeColor: "#479aef",
      animationDuration: 300,
      unitsColor: "white",
      titleColor: "white",
      subtitleColor: "white"
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }],
})
export class RevenueanalysisModule { }
