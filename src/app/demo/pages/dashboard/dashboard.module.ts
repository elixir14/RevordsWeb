import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { NavBarComponent } from '../../../theme/layout/admin/nav-bar/nav-bar.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { UtcToLocalTimePipeModule } from 'src/app/utctolocaltime.pipe.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    DashboardRoutingModule,
    NgApexchartsModule,
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
    NavBarComponent,
    { provide: LOCALE_ID, useValue: 'en-US' }],
  declarations: [DashboardComponent],
  
})
export class DashboardModule {
}
